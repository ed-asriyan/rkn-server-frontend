import type { SupabaseClient } from '@supabase/supabase-js';
import type { UsersStore, User } from './users-store';
import type { DescendantsStore } from './descendants-store';


const deserializeUser = (rawValue: any): User => ({
    uuid: rawValue.uuid as string,
    parentUuid: rawValue.parent_uuid as string,
    createdAt: new Date(rawValue['created_at'] as string),
    name: rawValue.name as string,
});

export class UsersService {
    private supabase: SupabaseClient;
    private usersStore: UsersStore;
    private descendantsStore: DescendantsStore;
    private uuid: string;

    constructor(supabase: SupabaseClient, usersStore: UsersStore, descendantsStore: DescendantsStore, uuid: string) {
        this.usersStore = usersStore;
        this.descendantsStore = descendantsStore;
        this.uuid = uuid;
        this.supabase = supabase;
    }

    async fetch(): Promise<void> {
        const { data, error } = await this.supabase.from('members').select('*', { count: 'exact' });
        if (error) {
            throw error;
        }

        const users: User[] = data.map(deserializeUser);

        this.usersStore.addOrUpdate(...users);
    }

    async adopt(name: string): Promise<User> {
        const { data, error } = await this.supabase.functions.invoke('adopt', {
            body: { parentUuid: this.uuid, name }
        });
        if (error) {
            throw error;
        }
        if (data.code === 0) {
            const user = deserializeUser(data.data);
            this.usersStore.addOrUpdate(user);
            this.descendantsStore.increase();
            return user;
        } else {
            throw data.code;
        }
    }

    async rename(uuid: string, name: string): Promise<void> {
        const { error } = await this.supabase.from('members').update({ name }).eq('uuid', uuid);
        if (error) {
            throw error;
        }
        const user: User | null = this.usersStore.getBy('uuid', uuid).get();
        if (user) {
           this.usersStore.addOrUpdate({ ...user, name });
        } else {
            await this.fetch();
        }
    }
}
