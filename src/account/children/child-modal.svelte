<script lang="ts">
    import * as UIkit from 'uikit';
    import QRCode from '@castlenine/svelte-qrcode';
    import type { User } from '../../stores/users-store';
    import { origin } from '../../config';
    import type { UsersService } from '../../stores/users-service';

    interface Props {
        member: User | null;
        usersService: UsersService;
    }

    let { member = $bindable(), usersService }: Props = $props();

    let isLoading = $state(false);

    let modal = $state(null);

    $effect(() => {
        if (member) {
            UIkit.modal(modal).show();
        } else {
            UIkit.modal(modal).hide();
        }
    });

    const copyToClipboard = function (text: string): void {
        navigator.clipboard.writeText(text).then(() => {
            UIkit.notification('Ссылка скопирована в буфер обмена', { status: 'success' });
        }).catch(err => {
            UIkit.notification('Ошибка. Скопируй вручную', { status: 'danger' });
        });
    };

    let shareLink = $derived(`${location.origin}/#/?uuid=${member?.id}`);

    const canShare: boolean = Boolean(navigator.share);
    const linkClick = function (): void {
        if (canShare) {
            navigator.share({
                title: 'ВПН',
                url: shareLink,
            });
        } else {
            copyToClipboard(shareLink);
        }
    };

    const rename = async function (): Promise<void> {
        if (!member) return;

        try {
            const newName = prompt('Введите новое имя:', member.name);
            if (newName) {
                await usersService.rename(member.id, newName);
                UIkit.notification('Имя изменено', { status: 'success' });
                member = { ...member, name: newName };
            }
        } catch (e) {
            console.error(e);
            alert('Ошибка');
        }
    };
</script>

<div bind:this={modal} uk-modal>
    {#if member}
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">
                Пользователь: <b>{ member.name }</b>
            </h2>
<button class="uk-button uk-button-default uk-button-small" onclick={rename}>✍🏻 Переименовать</button>
            <p class="uk-text-small uk-text-muted">Дата приглашения: { member.createdAt.toLocaleString() }</p>
            {#if isLoading}
                <div uk-spinner></div>
            {:else}
                <p>Поделись ссылкой с пользователем. Когда он перейдёт по ней, он получит персональный ВПН и инструкцию по установке</p>
                <div class="uk-text-center uk-margin-bottom">
                    <div class="uk-margin-bottom cursor" uk-tooltip="Скопировать ссылку" onclick={() => linkClick()}>
                        <QRCode data={shareLink} />
                    </div>
                    <code onclick={() => copyToClipboard(shareLink)} class="uk-margin-bottom uk-link" uk-tooltip="Скопировать">{ shareLink }</code>
                    <div>
                        <button class="uk-button uk-button-primary uk-button-smasll uk-text-truncate uk-margin-top" onclick={() => linkClick()}>👉 &nbsp Поделиться ссылкой &nbsp 👈</button>
                    </div>
                </div>
                <div>
                    <p>Правила:</p>
                    <ul>
                        <li>Если одним ВПНом будут пользоваться несколько людей, он будет <b>заблокирован</b></li>
                        <li>Если ВПНом не будут пользоваться более одного <b>месяца</b>, он может быть <b>отключён</b></li>
                    </ul>
                </div>
                <button class="uk-button uk-button-default" onclick={() => member = null}>Закрыть</button>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    code {
        text-wrap: auto;
    }
</style>
