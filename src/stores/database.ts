import { createClient } from '@supabase/supabase-js';
import { origin } from '../config';
import { writable } from 'svelte/store';

export class Member {
    uuid: string;
    parentUuid: string;
    createdAt: Date;
    name: string;

    constructor(data: any) {
        this.uuid = data['uuid'];
        this.parentUuid = data['parent_uuid'];
        this.createdAt = new Date(data['created_at']);
        this.name = data['name'];
    }
}

export class VpnConfig {
    uuid: string;
    hiddifyOpenUrl: string;
    hiddifySubscriptionUrl: string;
    xrayClientConfigSocks5Url: string;
    xrayClientConfigTproxyUrl: string;
    socks5DockerfileUrl: string;

    constructor(data: any) {
        this.uuid = data['uuid'];
        this.hiddifySubscriptionUrl = `${origin}/${this.uuid}/hiddify`;
        this.hiddifyOpenUrl = `hiddify://import/${this.hiddifySubscriptionUrl}`;
        this.xrayClientConfigSocks5Url = `${origin}/${this.uuid}/client-xray-config-socks5.json`;
        this.xrayClientConfigTproxyUrl = `${origin}/${this.uuid}/client-xray-config-tproxy.json`;
        this.socks5DockerfileUrl = `${origin}/${this.uuid}/socks5.Dockerfile`;
    }
}

export class AdoptError extends Error {
    code: number;

    constructor(code: number) {
        super();
        this.code = code;
    }
}

export class Database {
    private supabase: ReturnType<typeof createClient>;
    private uuid: string;
    isPasswordSetupNeeded: boolean;
    
    constructor(supabase: ReturnType<typeof createClient>, uuid: string, isPasswordSetupNeeded: boolean) {
        this.supabase = supabase;
        this.uuid = uuid;
        this.isPasswordSetupNeeded = isPasswordSetupNeeded;
    }

    static async connect(supabaseUrl: string, supabaseKey: string, uuid: string, password: string): Promise<Database> {
        const supabase = createClient<Database>(supabaseUrl, supabaseKey);
        await supabase.auth.signOut({ scope: 'local' });
        await supabase.auth.signInWithPassword({
            email: `${uuid}@example.com`,
            password,
        });
        return new Database(supabase, (await supabase.auth.getUser()).data.user.id, password === uuid);
    }

    async fetchChildren(): Promise<{ children: Member[], count: number }> {
        const { data, error, count } = await this.supabase.from('members').select('*', { count: 'exact' });
        if (error) {
            throw error;
        }
        return {
            children: data.map(rawValue => new Member(rawValue)),
            count,
        };
    }

    async descendantsCount(): Promise<{ count: number }> {
        const { data, error } = await this.supabase.from('members_descendants').select('count').eq('uuid', this.uuid);
        if (error) {
            throw error;
        }
        if (data.length === 0) {
            return { count: 0 };
        } else {
            return {
                count: data[0].count,
            };
        }
    }

    async adopt(name: string): Promise<Member> {
        const { data, error } = await this.supabase.functions.invoke('adopt', {
            body: { parentUuid: this.uuid, name }
        });
        if (error) {
            throw error;
        }
        if (data.code === 0) {
            return new Member(data.data);
        } else {
            throw new AdoptError(data.code);
        }
    }

    async renameConfig(childUuid: string, name: string): Promise<void> {
        const { error } = await this.supabase.from('members').update({ name }).eq('uuid', childUuid);
        if (error) {
            throw error;
        }
    }

    async changePassword(password: string): Promise<void> {
        const { error } = await this.supabase.auth.updateUser({ password });
        if (error) {
            throw error;
        }
        this.isPasswordSetupNeeded = password === this.uuid;
    }

    async fetchConfig(): Promise<VpnConfig> {
        const { data, error } = await this.supabase.from('configs').select('*').single();
        if (error) {
            throw error;
        }
        return new VpnConfig(data);
    }
}

export const database = writable<Database | null>(null);
