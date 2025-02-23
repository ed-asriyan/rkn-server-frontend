import { writable, type Writable } from 'svelte/store';

const createLocalStorageStore = function (key: string, initialValue: string): Writable<string> {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? storedValue : initialValue;

    const store = writable(data);

    store.subscribe(value => {
        localStorage.setItem(key, value);
    });

    return store;
}

export const passwordStore = createLocalStorageStore('password', '');