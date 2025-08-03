import { atom, computed, type ReadableAtom, type WritableAtom } from 'nanostores';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { DescendantsStore } from './descendants-store';

export class DescendantsService {
  private readonly store: DescendantsStore;
  private readonly supabase: SupabaseClient;
  private readonly uuid: string;

  constructor(supabase: SupabaseClient, uuid: string, store: DescendantsStore) {
    this.supabase = supabase;
    this.uuid = uuid;
    this.store = store;
  }

  async fetch(): Promise<void> {
      const { data, error } = await this.supabase.from('members_descendants').select('count').eq('uuid', this.uuid);
      if (error) {
          throw error;
      }
      if (data.length === 0) {
          this.store.set(0);
      } else {
          this.store.set(data[0].count);
      }
  }
}
