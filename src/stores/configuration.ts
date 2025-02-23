import { writable } from 'svelte/store';

export interface Configuration {
    uuid: string;
    password: string;
    hideConsent: boolean;
    hideChangePassword: boolean;
}

const initialConfiguration: Configuration = {
    uuid: '',
    hideConsent: false,
    hideChangePassword: false,
    password: '',
};

export const configurationStore = writable<Configuration>(initialConfiguration);
