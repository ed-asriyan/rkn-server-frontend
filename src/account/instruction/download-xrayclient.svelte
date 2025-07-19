<script lang="ts">
    import type { VpnConfig } from '../database';

    interface Props {
        config: VpnConfig;
    }

    let { config }: Props = $props();
</script>

<ul>
    <li><a class="uk-link uk-text-small" href={config.xrayClientConfigSocks5Url} target="_blank">Socks5</a></li>
    <li><a class="uk-link uk-text-small" href={config.xrayClientConfigTproxyUrl} target="_blank">TProxy</a></li>
</ul>