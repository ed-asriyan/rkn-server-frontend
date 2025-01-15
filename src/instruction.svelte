<script lang="ts">
    import * as UIkit from 'uikit';
    import type { VpnConfig } from './database';

    interface Props {
        config: VpnConfig
    }

    let { config }: Props = $props();

    const onConnectClick = function(): void {
        window.location.href = config.hiddifyOpenUrl;
    };

    let accordion: HTMLElement;
</script>

<div class="uk-padding uk-card uk-card-default uk-card-body">
    <h1 class="uk-card-title">Как подключиться?</h1>
    Это займет не более 30 секунд!
    <ul uk-accordion bind:this={accordion}>
        <li class="uk-open">
            <a class="uk-accordion-title" href>Шаг 1: Скачай <b>Hiddify</b></a>
            <div class="uk-accordion-content">
                <p>Выбери версию своего устройства и скачай приложение Hiddify по соответствующей ссылке</p>
                <div class="uk-child-width-expand" uk-grid>
                    <ul class="uk-list uk-list-divider" >
                        <li>
                            <a class="uk-link" href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank">📱 iPhone</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank">📱 iPad</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://play.google.com/store/apps/details?id=app.hiddify.com" target="_blank">📱 Android</a>
                        </li>
                    </ul>
                    <ul class="uk-list uk-list-divider">
                        <li>
                            <a class="uk-link" href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank">💻 macOS</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://play.google.com/store/apps/details?id=app.hiddify.com" target="_blank">🖥️ Windows</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://github.com/hiddify/hiddify-app/releases/latest" target="_blank">🖥️ Linux</a>
                        </li>
                    </ul>
                    <ul class="uk-list uk-list-divider">
                        <li>
                            <a class="uk-link" href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank">📺 Apple TV</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://play.google.com/store/apps/details?id=app.hiddify.com" target="_blank">📺 Android TV</a>
                        </li>
                    </ul>
                </div>
                <p>Как скачаешь и установишь, возвращайся обратно и нажми на кнопку "Готово!"</p>
                <div class="uk-text-center">
                    <button class="uk-button uk-button-primary" onclick={() => UIkit.accordion(accordion).toggle(1)}>Готово!</button>
                </div>
            </div>
        </li>
        <li>
            <a class="uk-accordion-title" href>Шаг 2: выключи проксирование на <b>российские</b> ресурсы</a>
            <div class="uk-accordion-content">
                <p class="uk-text-italic uk-text-small uk-text-muted">...чтобы не включать и выключать впн каждый раз</p>
                <ol>
                    <li>Открой <b>Hiddify</b></li>
                    <li>Нажми на <b>Settings</b> (кнопка с шестерёнками) внизу экрана в Hiddify</li>
                    <li>Пролистай до секции <b>Route Options</b> (3-я секция)</li>
                    <li>Нажми на <b>Region</b> (первый в секции)</li>
                    <li>Выбери <b>Russia (ru)</b></li>
                    <li>Закрой <b>Hiddify</b></li>
                </ol>
                <div class="uk-text-center uk-margin-top">
                    <button class="uk-button uk-button-primary" onclick={() => UIkit.accordion(accordion).toggle(2)}>Готово!</button>
                </div>
            </div>
        </li>
        <li>
            <a class="uk-accordion-title" href>Шаг 3: <b>подключи ВПН</b></a>
            <div class="uk-accordion-content">
                <p>
                    Нажми на кнопку <b>Подключить ВПН</b> внизу.<br/>
                    Откроется приложение, должно выскочить зеленое уведомление, что ВПН добавлен.
                </p>
                <div class="uk-text-center">
                    <button class="uk-button uk-button-danger uk-button-large" onclick={onConnectClick}><b>Подключить ВПН</b></button>
                </div>
                <p>
                    После этого нажми на большую кнопку <b>Connect</b> в середине экрана.
                </p>
                <p>
                    Если кнопка не работает, скопируй текст ниже и вставь его в Hiddify:
                </p>
                <p class="uk-text-center">
                    <code>{config.hiddifySubscriptionUrl}</code>
                </p>
            </div>
        </li>
    </ul>
</div>

<style lang="scss">
    .download-link {
        max-width: 10rem;
        cursor: pointer;
    }

    code {
        text-wrap: auto;
    }
</style>