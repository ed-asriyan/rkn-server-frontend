<script lang="ts">
    import { location } from '@wjfe/n-savant';
    import type { VpnConfig } from '../database';

    interface Props {
        config: VpnConfig,
        uuid: string
    }

    let { config, uuid }: Props = $props();

    const onConnectClick = function(): void {
        window.location.href = config.hiddifyOpenUrl;
    };
</script>

<p>
    Нажми на кнопку <b class="uk-text-danger cursor" onclick={onConnectClick}>Подключить ВПН</b><br/>
    Откроется приложение, должно выскочить зеленое уведомление, что ВПН добавлен.
</p>
<div class="uk-text-center uk-margin-bottom">
    <button class="uk-button uk-button-danger uk-button-large" onclick={onConnectClick}><b>Подключить ВПН</b></button>
</div>
<div class="uk-text-muted uk-text-small uk-text-center">
    Если кнопка не работает, скопируй текст ниже и вставь его в Hiddify:
    <p class="uk-text-center">
        <code class="code">{config.hiddifySubscriptionUrl}</code>
    </p>
</div>

<p>
    После этого нажми на большую кнопку <b>Connect</b> в середине экрана.
</p>
