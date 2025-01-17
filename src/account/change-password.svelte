<script lang="ts">
    import { onMount } from 'svelte';
    import * as UIkit from 'uikit';
    import type { Database } from '../database';

    interface Props {
        database: Database;
    }

    let { database }: Props = $props();

    onMount(() => {
        if (database.isPasswordSetupNeeded) {
            UIkit.modal(modal).show();
        }
    });

    let newPassword = $state('');
    let confirmPassword = $state('');
    let modal = $state(null);

    let isLoading = $state(false);

    const changePassword = async function (e) {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            isLoading = true;
            await database.changePassword(newPassword);
            UIkit.modal(modal).hide();
        } catch (e) {
            console.error(e);
            alert(e.toString());
        } finally {
            isLoading = false;
        }

        localStorage.setItem('password', newPassword);
    };
</script>

<div class="uk-text-center uk-margin-bottom">
    <button class="uk-button uk-button-default" onclick={() => UIkit.modal(modal).show()}>🔐 Сменить пароль</button>
</div>
<div bind:this={modal} uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Сменить пароль</h2>
        {#if database.isPasswordSetupNeeded}
            <p>Скорее всего ты открыл эту ссылку в первый раз. Ты можешь создать пароль, чтобы только ты мог иметь доступ к этому ВПН.</p>
        {/if}

        <p>Минимум 6 символов</p>
        <form onsubmit={changePassword}>
            <div class="uk-margin">
                <label for="new-password">Новый пароль</label>
                <input class="uk-input" type="password" minlength="6" bind:value={newPassword} required />
            </div>
            <div class="uk-margin">
                <label for="confirm-password">Подтвредите новый пароль</label>
                <input class="uk-input" type="password" minlength="6" bind:value={confirmPassword} required />
            </div>
            {#if isLoading}
                <div uk-spinner></div>
            {:else}
                <div class="uk-margin">
                    <button type="submit" class="uk-button uk-button-primary">Сохранить</button>
                    <button class="uk-button uk-button-default" onclick={() => UIkit.modal(modal).hide()}>закрыть</button>
                </div>
            {/if}
        </form>
    </div>
</div>
