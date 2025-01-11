<script lang="ts">
  import 'uikit/dist/js/uikit';
  import Faq from './faq.svelte';
  import Instruction from './instruction.svelte';
  import AdoptedKeys from './adopted-keys.svelte';
  import Consent from './consent.svelte';
  import { Database } from './database';
  import ChangePassword from './change-password.svelte';

  const parseHash = function(): string {
      if (!parseHash.value) {
          parseHash.value = window.location.hash.substring(1);
          // invalidate location so that users cannot share personal links
          window.history.pushState({}, '', '/#do-not-share-your-personal-link');
      }
      return parseHash.value;
  };

  const connect = async function(): Promise<Database> {
    const hash = parseHash();

    const savedPassword = localStorage.getItem('password');
    if (savedPassword) {
      try {
        return await Database.connect(hash, savedPassword);
      } catch (e) {
      }
    } else {
      try {
        return await Database.connect(hash, hash);
      } catch (e) {
      }
    }

    while (true) {
      const password = prompt('Введите пароль:');
      localStorage.setItem('password', password);
      try {
        return await Database.connect(hash, password);
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
  <div class="uk-section uk-section-muted">
    <div class="uk-container">
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
    <div class="uk-container">
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