import type { SupabaseClient } from '@supabase/supabase-js';
import { Config, type ConfigsStore } from './configs-store';

export class ConfigsService {
  private readonly store: ConfigsStore;
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient, store: ConfigsStore) {
    this.store = store;
    this.supabase = supabase;
  }

  async fetch(): Promise<void> {
    const { data, error } = await this.supabase.from('configs').select('*').single();
    if (error) {
        throw error;
    }
    this.store.addOrUpdate(new Config(data.uuid));
  }
}