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

    let { id, configsStore }: { id: string, configsStore: ConfigsStore } = $props();

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
                style: 'default' | 'primary' | 'secondary' | 'danger';
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
                    style: 'default',
                },
                { 
                    name: '🤖 Android',
                    next: 'downloadAndroid',
                    style: 'default',
                },
                { 
                    name: '💻 macOS',
                    next: 'downloadMacos',
                    style: 'default',
                },
                { 
                    name: '🪟 Windows',
                    next: 'downloadWindows',
                    style: 'default',
                },
                { 
                    name: '🐧 Linux',
                    next: 'downloadLinux',
                    style: 'default',
                },
                { 
                    name: '📺 Apple TV',
                    next: 'downloadAppleTv',
                    style: 'default',
                },
                { 
                    name: '📺 Android TV',
                    next: 'downloadAndroidTv',
                    style: 'default',
                },
                { 
                    name: '🐳 Docker',
                    next: 'downloadDocker',
                    style: 'default',
                },
                { 
                    name: '📶 OpenWrt',
                    next: 'downloadOpenwrt',
                    style: 'default',
                },
                { 
                    name: '⚙️ Xray config',
                    next: 'downloadXrayClientConfig',
                    style: 'default',
                },
            ],
        },
        downloadAndroid: {
            name: 'Android',
            component: DownloadAndroid,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
                { name: '⛔ Нажми сюда, если приложение не доступно в моей стране', next: 'downloadAndroidTroubleshoot', style: 'danger' },
            ],
        },
        downloadAndroidTroubleshoot: {
            name: 'Android - Не доступно',
            component: DownloadAndroidTroubleshoot,
            options: [
                { name: '✅ Как сделаешь, нажми сюда →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadIos: {
            name: 'iOS',
            component: DownloadIos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
                { name: '⛔ Нажми сюда, если приложение не доступно в моей стране', next: 'downloadIosTroubleshoot', style: 'danger' },
            ],
        },
        downloadIosTroubleshoot: {
            name: 'iOS - Не доступно',
            component: DownloadIosTroubleshoot,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'downloadIosAfterCountryChange', style: 'primary' },
            ],
        },
        downloadIosAfterCountryChange: {
            name: 'iOS - После смены страны',
            component: DownloadIos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadAppleTv: {
            name: 'Apple TV',
            component: DownloadIos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadAndroidTv: {
            name: 'Android TV',
            component: DownloadAndroid,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadMacos: {
            name: 'MacOS',
            component: DownloadMacos,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
                { name: '⛔ Нажми сюда, если приложение не доступно в моей стране', next: 'downloadMacosTroubleshoot', style: 'danger' },
            ],
        },
        downloadMacosTroubleshoot: {
            name: 'MacOS - Не доступно',
            component: DownloadMacsTroubleshoot,
            options: [
                { name: '✅ Нажми сюда, как сделаешь →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadWindows: {
            name: 'Windows',
            component: DownloadWindows,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadLinux: {
            name: 'Linux',
            component: DownloadLinux,
            options: [
                { name: '✅ Нажми сюда, как установишь →', next: 'hiddifyPostInstallation', style: 'primary' },
            ],
        },
        downloadDocker: {
            name: 'Socks5 via Docker',
            component: DownloadDocker,
            options: [
                { name: '✅ Готово!', next: 'done', style: 'primary' },
            ],
        },
        downloadOpenwrt: {
            name: 'OpenWrt',
            component: DownloadOpenwrt,
            options: [
                { name: '✅ Готово!', next: 'done', style: 'primary' },
            ],
        },
        downloadXrayClientConfig: {
            name: 'Xray Client Config',
            component: DownloadXrayclient,
            options: [
                { name: '✅ Готово!', next: 'done', style: 'primary' },
            ],
        },
        hiddifyPostInstallation: {
            name: 'Hiddify - после установки',
            component: HiddifyPostInstallation,
            options: [
                { name: '✅ Нажми сюда, как сделаешь →', next: 'connect', style: 'primary' },
            ],
        },
        connect: {
            name: 'Подключение',
            component: Connect,
            options: [
                { name: '✅ Нажми сюда как сделаешь →', next: 'done', style: 'primary' },
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
<button class="uk-button uk-button-default uk-width-1-1 uk-margin" onclick={() => location.navigate(`/${id}`) }>🏠 На главную</button>

<div class="uk-padding uk-card uk-card-default uk-card-body">
    <h2 class="uk-text-center">{ currentStep.name }</h2>
    {#if currentStep.description}
        <p class="uk-text-center">{ currentStep.description }</p>
    {/if}
    {#if currentStep.component}
        <svelte:component this={currentStep.component} {config} {id} />
    {/if}
    {#if currentStep.options}
        <div class="uk-grid-small uk-child-width-1-1" class:uk-child-width-1-3@m={currentStep.options.length >= 3} class:uk-child-width-1-2@s={currentStep.options.length >= 3} uk-grid>
            {#each currentStep.options as option}
                <div>
                    <button class="uk-button uk-button-{option.style || 'default'} uk-width-1-1 uk-text-middle" onclick={() => next(option.next)}>
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