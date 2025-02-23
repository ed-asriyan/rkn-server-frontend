<script lang="ts">
  import { RouterView } from '@dvcol/svelte-simple-router/components';
  import Consent from './consent.svelte';
  import { configurationStore } from '../stores/configuration';
  import { options } from './router';
</script>

{#if !$configurationStore.hideConsent}
  <Consent />
{/if}
<div class="container">
  <div class="uk-container uk-container-xsmall uk-margin-top">
    <RouterView {options} />
  </div>
</div>
