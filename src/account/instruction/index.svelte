<script lang="ts">
    import { location } from '@svelte-router/core';
    import LogoEmoji from '../../components/logo-emoji.svelte';
    import DownloadDocker from './download-docker.svelte';
    import Done from './done.svelte';
    import DownloadAndroid from './download-android.svelte';
    import DownloadAndroidTroubleshoot from './download-android-troubleshoot.svelte';
    import DownloadIos from './download-ios.svelte';
    import DownloadOpenwrt from './download-openwrt.svelte';
    import DownloadXrayclient from './download-xrayclient.svelte';
    import DownloadIosTroubleshoot from './download-ios-troubleshoot.svelte';
    import HiddifyPostInstallation from './hiddify-post-installation.svelte';
    import DownloadMacos from './download-macos.svelte';
    import DownloadMacsTroubleshoot from './download-macs-troubleshoot.svelte';
    import DownloadLinux from './download-linux.svelte';
    import DownloadWindows from './download-windows.svelte';
    import Connect from './connect.svelte';
    import type { ConfigsStore } from '../../stores/configs-store';

    let { uuid, configsStore }: { uuid: string, configsStore: ConfigsStore } = $props();

    let allConfigs = $derived(configsStore.items);
    let config = $derived($allConfigs[0]);

    type Steps =
        'selectDevice' |
        'downloadIos' |
        'downloadIosTroubleshoot' |
        'downloadIosAfterCountryChange' |
        'downloadAppleTv' |
        'downloadAndroid' |
        'downloadAndroidTv' |
        'downloadAndroidTroubleshoot' |
        'downloadMacos' |
        'downloadMacosTroubleshoot' |
        'downloadWindows' |
        'downloadLinux' |
        'downloadDocker' |
        'downloadOpenwrt' |
        'downloadXrayClientConfig' |
        'hiddifyPostInstallation' |
        'connect' |
        'done';
    
    type Instruction = {
        [key in Steps]: {
            name: string;
            description?: string;
            component?: any;
            options: {
                name: string;
                next: Steps;
            }[];
        }
    }

    const instruction: Instruction = {
        selectDevice: {
            name: 'Выбери устройство',
            options: [
                { 
                    name: '📱 iPhone/iPad',
                    next: 'downloadIos',
                },
                { 
                    name: '🤖 Android',
                    next: 'downloadAndroid',
                },
                { 
                    name: '💻 macOS',
                    next: 'downloadMacos',
                },
                { 
                    name: '🪟 Windows',
                    next: 'downloadWindows',
                },
                { 
                    name: '🐧 Linux',
                    next: 'downloadLinux',
                },
                { 
                    name: '📺 Apple TV',
                    next: 'downloadAppleTv',
                },
                { 
                    name: '📺 Android TV',
                    next: 'downloadAndroidTv',
                },
                { 
                    name: '🐳 Docker',
                    next: 'downloadDocker',
                },
                { 
                    name: '📶 OpenWrt',
                    next: 'downloadOpenwrt',
                },
                { 
                    name: '⚙️ Xray config',
                    next: 'downloadXrayClientConfig',
                },
            ],
        },
        downloadAndroid: {
            name: 'Android',
            component: DownloadAndroid,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
                { name: '⛔ Нажми сюда, если приложение не доступно в моей стране', next: 'downloadAndroidTroubleshoot' },
            ],
        },
        downloadAndroidTroubleshoot: {
            name: 'Android - Не доступно',
            component: DownloadAndroidTroubleshoot,
            options: [
                { name: '✅ Как сделаешь, нажми сюда →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadIos: {
            name: 'iOS',
            component: DownloadIos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
                { name: '⛔ Нажми сюда, если приложение не доступно в моей стране', next: 'downloadIosTroubleshoot' },
            ],
        },
        downloadIosTroubleshoot: {
            name: 'iOS - Не доступно',
            component: DownloadIosTroubleshoot,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'downloadIosAfterCountryChange' },
            ],
        },
        downloadIosAfterCountryChange: {
            name: 'iOS - После смены страны',
            component: DownloadIos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadAppleTv: {
            name: 'Apple TV',
            component: DownloadIos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadAndroidTv: {
            name: 'Android TV',
            component: DownloadAndroid,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadMacos: {
            name: 'MacOS',
            component: DownloadMacos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
                { name: '⛔ Нажми сюда, если приложение не доступно в моей стране', next: 'downloadMacosTroubleshoot' },
            ],
        },
        downloadMacosTroubleshoot: {
            name: 'MacOS - Не доступно',
            component: DownloadMacsTroubleshoot,
            options: [
                { name: '✅ Нажми сюда, как сделаешь →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadWindows: {
            name: 'Windows',
            component: DownloadWindows,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadLinux: {
            name: 'Linux',
            component: DownloadLinux,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation' },
            ],
        },
        downloadDocker: {
            name: 'Socks5 via Docker',
            component: DownloadDocker,
            options: [
                { name: '✅ Готово!', next: 'done' },
            ],
        },
        downloadOpenwrt: {
            name: 'OpenWrt',
            component: DownloadOpenwrt,
            options: [
                { name: '✅ Готово!', next: 'done' },
            ],
        },
        downloadXrayClientConfig: {
            name: 'Xray Client Config',
            component: DownloadXrayclient,
            options: [
                { name: '✅ Готово!', next: 'done' },
            ],
        },
        hiddifyPostInstallation: {
            name: 'Hiddify - после установки',
            component: HiddifyPostInstallation,
            options: [
                { name: '✅ Нажми сюда, как сделаешь →', next: 'connect' },
            ],
        },
        connect: {
            name: 'Подключение',
            component: Connect,
            options: [
                { name: '✅ Нажми сюда как сделаешь →', next: 'done' },
            ],
        },
        done: {
            name: 'Готово!',
            description: 'Вы завершили настройку Anywhere VPN!',
            component: Done,
            options: [
            ]
        },
    };

    let stack = $state<Steps[]>(['selectDevice']);
    let currentStep = $derived(instruction[stack[stack.length - 1]]);
    let nextStep: Steps | null = $state(null);

    const next = function(step: Steps): void {
        stack.push(step);
        nextStep = null;
        if (instruction[step].options.length === 1) {
            nextStep = instruction[step].options[0].next;
        }
    };

    const previous = function(): void {
        if (stack.length > 1) {
            stack.pop();
            nextStep = null;
            if (instruction[stack[stack.length - 1]].options.length === 1) {
                nextStep = instruction[stack[stack.length - 1]].options[0].next;
            }
        }
    };
</script>

<h1 class="uk-heading-small uk-text-center"><LogoEmoji/>&nbsp;&nbspAnywhere VPN</h1>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin" onclick={() => location.navigate(`/${uuid}`) }>🏠 На главную</button>

<div class="uk-padding uk-card uk-card-default uk-card-body">
    <h2 class="uk-text-center">{ currentStep.name }</h2>
    {#if currentStep.description}
        <p class="uk-text-center">{ currentStep.description }</p>
    {/if}
    {#if currentStep.component}
        <svelte:component this={currentStep.component} {config} {uuid} />
    {/if}
    {#if currentStep.options}
        <div class="uk-grid-small uk-child-width-1-1" class:uk-child-width-1-3@m={currentStep.options.length >= 3} class:uk-child-width-1-2@s={currentStep.options.length >= 3} uk-grid>
            {#each currentStep.options as option}
                <div>
                    <button class="uk-button uk-button-default uk-width-1-1 uk-text-middle" onclick={() => next(option.next)}>
                    {option.name}
                    </button>
                </div>
            {/each}
        </div>
    {/if}
</div>
{#if stack.length > 1}
    <div class="uk-margin-top">
    <button class="uk-button uk-button-default uk-width-1-1" onclick={previous} disabled={stack.length <= 1}>Назад</button>
    </div>
{/if}