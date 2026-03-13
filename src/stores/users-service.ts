import type { SupabaseClient } from '@supabase/supabase-js';
import type { UsersStore, User } from './users-store';
import type { DescendantsStore } from './descendants-store';


const deserializeUser = (rawValue: any): User => ({
    id: rawValue['user_id'] as string,
    parentId: rawValue['parent_id'] as string,
    createdAt: new Date(rawValue['created_at'] as string),
    name: rawValue.name as string,
});

export class UsersService {
    private supabase: SupabaseClient;
    private usersStore: UsersStore;
    private descendantsStore: DescendantsStore;

    constructor(supabase: SupabaseClient, usersStore: UsersStore, descendantsStore: DescendantsStore) {
        this.usersStore = usersStore;
        this.descendantsStore = descendantsStore;
        this.supabase = supabase;
    }

    async fetch(): Promise<void> {
        const { data, error } = await this.supabase.from('user_memberships').select('*', { count: 'exact' });
        if (error) {
            throw error;
        }

        const users: User[] = data.map(deserializeUser);

        this.usersStore.addOrUpdate(...users);
    }

    async adopt(name: string): Promise<User> {
        const { data, error } = await this.supabase.functions.invoke('adopt', {
            body: { name }
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
        const { error } = await this.supabase.from('members').update({ name }).eq('id', uuid);
        if (error) {
            throw error;
        }
        const user: User | null = this.usersStore.getBy('id', uuid).get();
        if (user) {
           this.usersStore.addOrUpdate({ ...user, name });
        } else {
            await this.fetch();
        }
    }
}
