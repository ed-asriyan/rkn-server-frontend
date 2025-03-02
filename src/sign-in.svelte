<script lang="ts">
  import { onMount } from 'svelte';
  import { database, Database } from './stores/database';
  import { configurationStore, type Configuration } from './stores/configuration';
  import type { Config } from './config';
  import Account from './account/index.svelte';
  import { passwordStore } from './stores/local-storage';

  interface Props {
      config: Config;
  }

  let { config }: Props = $props();

  if ($configurationStore.password) {
    $passwordStore = $configurationStore.password;
  }

  onMount(async () => {
    window.history.pushState({}, '', '/#/');

    if ($passwordStore) {
      try {
        $database = await auth($passwordStore);
      } catch (e) {
      }
    }
    if ($database) return;

    if ($configurationStore.password) {
      try {
        $database = await auth($configurationStore.password);
      } catch (e) {
      }
    }
    if ($database) return;

    try {
      $database = await auth($configurationStore.uuid);
    } catch (e) {
    }
    if ($database) return;
  });

  let isLoading = $state(false);
  const auth = async function(password: string): Promise<Database> {
    isLoading = true;
    try {
      const result = await Database.connect(config, $configurationStore.uuid, password);
      $passwordStore = password;
      return result;
    } finally {
      isLoading = false;
    }
  };

  let isPasswordInvalid: boolean = $state(false);

  const onSumbut = async function(e: Event) {
    const password = e.target.password.value;

    try {
      $database = await auth(password);
    } catch (e) {
      isPasswordInvalid = true;
    }
  };
</script>

<div class="uk-container uk-container-xsmall">
  {#if $database}
    <Account />
  {:else}
    <div class="uk-flex uk-flex-center uk-flex-middle" style="height: 100vh;">
      <form class="uk-form-stacked" on:submit|preventDefault={onSumbut}>
        <div class="uk-margin">
          <label class="uk-form-label" for="password">Пароль</label>
          <div class="uk-form-controls">
            <input class="uk-input" id="password" type="password" required disabled={isLoading} />
          </div>
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-primary" type="submit" disabled={isLoading}>
            {#if isLoading}
              <div uk-spinner="ratio: 0.7" class="uk-margin-right"></div> 
              Думаю думалку...
            {:else}
              Войти
            {/if}
          </button>
        </div>
        {#if isPasswordInvalid}
          <div class="uk-margin uk-text-danger">
            Неверный пароль. Попробуйте еще раз.
          </div>
        {/if}
      </form>
    </div>
  {/if}
</div>

<style lang="scss">
  :global(html) {
    background-color: #f4f4f4;
  }
</style>
