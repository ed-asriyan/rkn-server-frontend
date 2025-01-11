import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from './settings';


export class Config {
    childUuid: string;
    parentUuid: string;
    createdAt: Date;
    name: string;

    constructor(data: any) {
        this.childUuid = data['child_uuid'];
        this.parentUuid = data['parent_uuid'];
        this.createdAt = new Date(data['created_at']);
        this.name = data['name'];
    }
}

export class Database {
    private supabase: ReturnType<typeof createClient>;
    private uuid: string;
    
    constructor(supabase: ReturnType<typeof createClient>, uuid: string) {
        this.supabase = supabase;
        this.uuid = uuid;
    }

    static async connect(uuid: string): Promise<Database> {
        const supabase = createClient<Database>(supabaseUrl, supabaseKey);
        await supabase.auth.signInWithPassword({
            email: `${uuid}@example.com`,
            password: uuid,
        });
        return new Database(supabase, uuid);
    }

    async fetchChildren(): Promise<{ children: Config[], count: number }> {
        const { data, error, count } = await this.supabase.from('users').select('*', { count: 'exact' });
        console.log(data);
        if (error) {
            throw error;
        }
        return {
            children: data.map(rawValue => new Config(rawValue)),
            count,
        };
    }

    async adopt(name: string): Promise<number> {
        const { data, error } = await this.supabase.functions.invoke('adopt', {
            body: { parentUuid: this.uuid, name }
        });
        if (error) {
            throw error;
        }
        return data.code;
    }

    async renameConfig(childUuid: string, name: string): Promise<void> {
        const { error } = await this.supabase.from('users').update({ name }).eq('child_uuid', childUuid);
        if (error) {
            throw error;
        }
    }
}
