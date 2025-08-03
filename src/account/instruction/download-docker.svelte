<script lang="ts">
    import type { Config } from '../../stores/configs-store';

    interface Props {
        config: Config;
    }

    let { config = $bindable() }: Props = $props();

    const name = 'xray-client';
</script>


<ol>
    <li>Скачай и установи <a href="https://docker.com" target="_blank">Docker</a></li>
    <li>
        <p>Собери образ:</p>
        <pre>docker build -t { name } { config.socks5DockerfileUrl }</pre>
    </li>
    <li>
        <p>Запусти контейнер:</p>
        <pre>docker run --rm -p 1080:1080 -d --name {name} {name}</pre>
    </li>
    <li>
        <p>Настрой приложения на проксирование трафика через <code>socks5://localhost:1080</code></p>
    </li>
</ol>

