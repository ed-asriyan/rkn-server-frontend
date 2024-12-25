interface RawConfig {
    hiddifyUrl: string;
}

export class ClientConfig {
    readonly hiddifySubscriptionUrl: string;
    readonly hiddifyOpenUrl: string;

    private constructor (raw: RawConfig) {
        this.hiddifySubscriptionUrl = `https://${location.host}${raw.hiddifyUrl}`;
        this.hiddifyOpenUrl = `hiddify://import/${this.hiddifySubscriptionUrl}`;

    }

    static async fetch (uuid: string): Promise<ClientConfig> {
        const response = await fetch(`/${uuid}/urls-map.json`);
        const data = await response.json();

        return new ClientConfig({
            hiddifyUrl: data['hiddify_url'],
        });
    }
}
