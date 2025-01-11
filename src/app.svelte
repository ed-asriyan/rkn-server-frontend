<script lang="ts">
  import { onMount } from 'svelte';
  import 'uikit/dist/js/uikit';
  import { ClientConfig } from './api';
  import Faq from './faq.svelte';
  import Instruction from './instruction.svelte';
  import AdoptedKeys from './adopted-keys.svelte';
  import Consent from './consent.svelte';

  let hash: string = $state('');

  onMount(() => {
      hash = parseHash();
  });

  const parseHash = function(): string {
      if (!parseHash.value) {
          parseHash.value = window.location.hash.substring(1);
          // invalidate location so that users cannot share personal links
          window.history.pushState({}, '', '/#do-not-share-your-personal-link');
      }
      return parseHash.value;
  };
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

{#await ClientConfig.fetch(hash)}
  <div uk-spinner></div>
{:then config}
  <Consent />
  <div class="uk-section uk-section-muted">
    <div class="uk-container">
      <Instruction config={config}/>
    </div>
  </div>

  <div class="uk-section uk-section-secondary">
    <div class="uk-container">
      <AdoptedKeys uuid={hash}/>
    </div>
  </div>

  <div class="uk-section uk-section-primary uk-light">
    <div class="uk-container">
      <Faq/>
    </div>
  </div>
{:catch}
  <script>
    window.location.href = '/';
  </script>
{/await}