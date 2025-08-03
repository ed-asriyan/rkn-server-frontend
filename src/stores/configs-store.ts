import { origin } from '../config';
import { AbstractStore } from './abstract-store';

export class Config {
    readonly uuid: string;
    readonly hiddifyOpenUrl: string;
    readonly hiddifySubscriptionUrl: string;
    readonly xrayClientConfigSocks5Url: string;
    readonly xrayClientConfigTproxyUrl: string;
    readonly socks5DockerfileUrl: string;

    constructor(uuid: string) {
        this.uuid = uuid;
        this.hiddifySubscriptionUrl = `${origin}/${this.uuid}/hiddify`;
        this.hiddifyOpenUrl = `hiddify://import/${this.hiddifySubscriptionUrl}`;
        this.xrayClientConfigSocks5Url = `${origin}/${this.uuid}/client-xray-config-socks5.json`;
        this.xrayClientConfigTproxyUrl = `${origin}/${this.uuid}/client-xray-config-tproxy.json`;
        this.socks5DockerfileUrl = `${origin}/${this.uuid}/socks5.Dockerfile`;
    }
}

export class ConfigsStore extends AbstractStore<Config, 'uuid'> {
  constructor() {
    super(['uuid'], []);
  }
}
