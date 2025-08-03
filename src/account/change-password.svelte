<script lang="ts">
    import { onMount } from 'svelte';
    import * as UIkit from 'uikit';
    import { changePassword, isPasswordDefaultStore } from '../stores/auth';
    import type { SupabaseClient } from '@supabase/supabase-js';

    interface Params {
        supabase: SupabaseClient;
        show: boolean;
    }

    let { show = $bindable(), supabase }: Params = $props();

    onMount(() => {
        if ($isPasswordDefaultStore) {
            UIkit.modal(modal).show();
        }
    });

    let newPassword = $state('');
    let confirmPassword = $state('');
    let modal = $state(null);

    let isLoading = $state(false);

    $effect(() => {
        if (show) {
            UIkit.modal(modal).show();
        } else {
            UIkit.modal(modal).hide();
        }
    });

    const changePasswordHandler = async function (e) {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            isLoading = true;
            await changePassword(supabase, newPassword);
            show = false;
            UIkit.modal(modal).hide();
            newPassword = '';
            confirmPassword = '';
        } catch (e) {
            console.error(e);
        } finally {
            isLoading = false;
        }
    };
</script>

<div bind:this={modal} uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Сменить пароль</h2>
        {#if $isPasswordDefaultStore}
            <p>Скорее всего ты открыл эту ссылку в первый раз. Ты можешь создать пароль, чтобы только ты мог иметь доступ к этому ВПН.</p>
        {/if}

        <p>Минимум 6 символов</p>
        <form onsubmit={changePasswordHandler}>
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
                    <button class="uk-button uk-button-default" onclick={() => { show = false; UIkit.modal(modal).hide(); }}>закрыть</button>
                </div>
            {/if}
        </form>
    </div>
</div>
