import { atom, computed, type ReadableAtom, type WritableAtom } from 'nanostores';

export class DescendantsStore {
  private readonly _count: WritableAtom<number | null> = atom<number | null>(null);

  readonly count: ReadableAtom<number | null> = computed(this._count, (count) => count);

  increase (): void {
    this._count.set((this._count.get() || 0) + 1);
  }

  set(count: number): void {
    if (count < 0) {
      throw new Error('Count cannot be negative');
    }
    this._count.set(count);
  }
}
