import { origin } from '../config';
import { AbstractStore } from './abstract-store';

export class Config {
    readonly id: string;
    readonly hiddifyOpenUrl: string;
    readonly hiddifySubscriptionUrl: string;
    readonly xrayClientConfigSocks5Url: string;
    readonly xrayClientConfigTproxyUrl: string;
    readonly socks5DockerfileUrl: string;

    constructor(id: string) {
        this.id = id;
        this.hiddifySubscriptionUrl = `${origin}/${this.id}/hiddify`;
        this.hiddifyOpenUrl = `hiddify://import/${this.hiddifySubscriptionUrl}`;
        this.xrayClientConfigSocks5Url = `${origin}/${this.id}/client-xray-config-socks5.json`;
        this.xrayClientConfigTproxyUrl = `${origin}/${this.id}/client-xray-config-tproxy.json`;
        this.socks5DockerfileUrl = `${origin}/${this.id}/socks5.Dockerfile`;
    }
}

export class ConfigsStore extends AbstractStore<Config, 'id'> {
  constructor() {
    super(['id'], []);
  }
}
