<script lang="ts">
    import * as UIkit from 'uikit';
    import { location } from '@svelte-router/core';
    import type { Config } from '../../stores/configs-store';
    import Docker from './docker.svelte';
    import Openwrt from './openwrt.svelte';

    interface Props {
        config: Config,
        id: string
    }

    let { config, id }: Props = $props();

    const onConnectClick = function(): void {
        window.location.href = config.hiddifyOpenUrl;
    };

    let accordion: HTMLElement;
    let accourdionList: HTMLElement[] = [];

    const onSwitchAccorion = function(index: number): void {
        UIkit.accordion(accordion).toggle(index);
        if (window.innerWidth < 768) {
            accourdionList[index - 1]?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    let dockerConfig = $state(null);
    let openwrtConfig = $state(null);
</script>

<div class="uk-padding uk-card uk-card-default uk-card-body">
    <ul uk-accordion bind:this={accordion}>
        <li bind:this={accourdionList[0]} class="uk-open">
            <a class="uk-accordion-title" href>Шаг 1: скачай <b>Hiddify</b></a>
            <div class="uk-accordion-content">
                <p>Выбери устройство и установи приложение. Как установишь, не спеши открывать приложение. Возвращайся сюда и нажми на кнопку "Готово!"</p>
                <div class="" uk-grid>
                    <ul class="uk-list uk-list-divider uk-width-1-4@m uk-width-1-2">
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
                    <ul class="uk-list uk-list-divider uk-width-1-4@m uk-width-1-2">
                        <li>
                            <a class="uk-link" href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank">💻 macOS</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://github.com/hiddify/hiddify-app/releases/latest/download/Hiddify-Windows-Setup-x64.Msix" target="_blank">🖥️ Windows</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://github.com/hiddify/hiddify-app/releases/latest" target="_blank">🖥️ Linux</a>
                        </li>
                    </ul>
                    <ul class="uk-list uk-list-divider uk-width-1-4@m uk-width-1-2">
                        <li>
                            <a class="uk-link" href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank">📺 Apple TV</a>
                        </li>
                        <li>
                            <a class="uk-link" href="https://play.google.com/store/apps/details?id=app.hiddify.com" target="_blank">📺 Android TV</a>
                        </li>
                    </ul>
                    <ul class="uk-list uk-list-divider uk-width-1-4@m uk-width-1-2">
                        <li>
                            <Openwrt bind:config={openwrtConfig} />
                            <a class="uk-link uk-text-small" onclick={() => openwrtConfig = config}>🛜 OpenWRT</a>
                        </li>
                        <li>
                            <Docker bind:config={dockerConfig} />
                            <a class="uk-link uk-text-small" onclick={() => dockerConfig = config}>🐳 Socks5 Docker</a>
                        </li>
                        <li>
                            <span class="uk-link uk-text-small" >⚙️ Xray client config</span>
                            <div uk-dropdown>
                                <ul>
                                    <li><a class="uk-link uk-text-small" href={config.xrayClientConfigSocks5Url} target="_blank">Socks5</a></li>
                                    <li><a class="uk-link uk-text-small" href={config.xrayClientConfigTproxyUrl} target="_blank">TProxy</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="uk-text-center">
                    <button class="uk-button uk-button-primary" onclick={() => onSwitchAccorion(1)}>Готово!</button>
                </div>
            </div>
        </li>
        <li bind:this={accourdionList[1]}>
            <a class="uk-accordion-title" href>Шаг 2: выключи проксирование на <b>российские</b> ресурсы</a>
            <div class="uk-accordion-content">
                <p class="uk-text-italic uk-text-small uk-text-muted">...чтобы не включать и выключать впн каждый раз</p>
                <ol>
                    <li>Открой <b>Hiddify</b></li>
                    <li>Появится запрос на разрешение создания ВПН конфигрураций. <b>Разреши</b>.</li>
                    <li>Должен появиться экран первичной настройки, найди на нем поле <b>Region</b> и выбери <b>Russia (ru)</b></li>
                    <li>Нажми <b>Start</b></li>
                </ol>
                <p>Как сделаешь, возвращайся сюда и нажми на кнопку "Готово!"</p>
                <div class="uk-text-center uk-margin-top">
                    <button class="uk-button uk-button-primary" onclick={() => onSwitchAccorion(2)}>Готово!</button>
                </div>
            </div>
        </li>
        <li bind:this={accourdionList[2]}>
            <a class="uk-accordion-title" href>Шаг 3: <b>подключи ВПН</b></a>
            <div class="uk-accordion-content">
                <p>
                    Нажми на кнопку <b class="uk-text-danger cursor" onclick={onConnectClick}>Подключить ВПН</b><br/>
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
                <p class="uk-text-center">
                    <button class="uk-button uk-button-primary" onclick={() => location.navigate(`/${id}/children`)}>Сделать ВПН для друга!</button>
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
