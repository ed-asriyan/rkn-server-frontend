import { atom, computed, type ReadableAtom, type WritableAtom } from 'nanostores';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { DescendantsStore } from './descendants-store';

export class DescendantsService {
  private readonly store: DescendantsStore;
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient, store: DescendantsStore) {
    this.supabase = supabase;
    this.store = store;
  }

  async fetch(): Promise<void> {
    const { data, error } = await this.supabase.functions.invoke('get_descendants_count', {});
    if (error) {
        throw error;
    }
    this.store.set(data.count);
  }
}
