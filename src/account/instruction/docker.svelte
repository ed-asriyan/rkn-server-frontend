<script lang="ts">
    import * as UIkit from 'uikit';
    import type { VpnConfig } from '../database';

    interface Props {
        config: VpnConfig;
    }

    let { config = $bindable() }: Props = $props();
    let modal = $state(null);

    $effect(() => {
        const modalObject = UIkit.modal(modal);
        if (config) {
            modalObject.show();
        } else {
            modalObject.hide();
        }
    });

    const name = 'xray-client';
</script>

<div bind:this={modal} uk-modal>
    {#if config}
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">Socks5 on Docker</h2>
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
            
            <button class="uk-button uk-button-default" onclick={() => config = null}>Закрыть</button>
        </div>
    {/if}
</div>
