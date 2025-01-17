<script lang="ts">
  import 'uikit/dist/js/uikit';
  import Faq from './faq.svelte';
  import Instruction from './instruction/index.svelte';
  import AdoptedKeys from './children/index.svelte';
  import Consent from './consent.svelte';
  import { Database } from './database';
  import ChangePassword from './change-password.svelte';
  import { fetchConfig } from './config';

  const parseHash = function(): string {
      if (!parseHash.value) {
          parseHash.value = window.location.hash.substring(1);
          // invalidate location so that users cannot share personal links
          window.history.pushState({}, '', '/#do-not-share-your-personal-link');
      }
      return parseHash.value;
  };

  const connect = async function(): Promise<Database> {
    const config = await fetchConfig();
    const hash = parseHash();

    const savedPassword = localStorage.getItem('password');
    if (savedPassword) {
      try {
        return await Database.connect(config, hash, savedPassword);
      } catch (e) {
      }
    }

    try {
      return await Database.connect(config, hash, hash);
    } catch (e) {
    }


    for (let i = 0; i < 3; i++) {
      const password: string = prompt('Введите пароль:');
      localStorage.setItem('password', password);
      try {
        return await Database.connect(config, hash, password);
      } catch (e) {
        alert('Неверный пароль');
      }
    }
  };

</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

{#await connect()}
  <div uk-spinner></div>
{:then database}
  <Consent />
  <div class="uk-section uk-section-muted uk-padding-remove-top">
    <div class="uk-container uk-container-xsmall uk-margin-top">
      <ChangePassword database={database}/>
      {#await database.fetchConfig()}
        <br/>
        <div uk-spinner></div>
      {:then config} 
        <Instruction config={config}/>
      {/await}
    </div>
  </div>

  <div class="uk-section uk-section-secondary">
    <div class="uk-container uk-container-xsmall">
      <AdoptedKeys database={database}/>
    </div>
  </div>

  <div class="uk-section uk-section-muted">
    <div class="uk-container">
      <Faq/>
    </div>
  </div>
{:catch}
  <script>
    window.location.href = '/';
  </script>
  lox
{/await}