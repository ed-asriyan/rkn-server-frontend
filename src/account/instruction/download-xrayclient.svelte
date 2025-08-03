<script lang="ts">
    import type { Config } from '../../stores/configs-store';

    interface Props {
        config: Config;
    }

    let { config }: Props = $props();
</script>

<ul>
    <li><a class="uk-link uk-text-small" href={config.xrayClientConfigSocks5Url} target="_blank">Socks5</a></li>
    <li><a class="uk-link uk-text-small" href={config.xrayClientConfigTproxyUrl} target="_blank">TProxy</a></li>
</ul>