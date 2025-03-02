import { readable, writable } from 'svelte/store';

export interface Configuration {
    uuid: string;
    password: string;
    hideConsent: boolean;
    hideChangePassword: boolean;
}

const initConfig = function (): Configuration {
    const url = new URL(window.location.hash.length > 1 ? `${window.location.origin}/${window.location.hash.substring(1)}` : window.location.href);
    const params = new URLSearchParams(url.search);
    return {
        uuid: params.get('uuid') || '',
        password: params.get('password') || '',
        hideConsent: params.get('hideConsent') === 'true',
        hideChangePassword: params.get('hideChangePassword') === 'true',
    };
};

export const configurationStore = readable<Configuration>(initConfig());
