import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { derived, writable, type Readable, type Writable } from 'svelte/store';

export const authSupabase = async function (supabaseUrl: string, supabaseKey: string, uuid: string, password: string): Promise<SupabaseClient> {
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.auth.signOut({ scope: 'local' });
    await supabase.auth.signInWithPassword({
        email: `${uuid}@example.com`,
        password,
    });
    if (!(await supabase.auth.getUser()).data.user) {
        throw new Error('Authentication failed. Please check your UUID and password.');
    }
    return supabase;
};

export const createLocalStorageStore = function (key: string, initialValue: string): Writable<string> {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? storedValue : initialValue;

    const store = writable(data);

    store.subscribe(value => {
        localStorage.setItem(key, value);
    });

    return store;
};

export const changePassword = async function(supabase: SupabaseClient, password: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        throw error;
    }
    passwordStore.set(password);
};

export const passwordStore = createLocalStorageStore('password', '');
export const uuidStore = createLocalStorageStore('uuid', '');
export const isPasswordDefaultStore: Readable<boolean> = derived([passwordStore, uuidStore], ([password, uuid]) => password === uuid);
