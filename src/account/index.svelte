<script lang="ts">
  import Faq from './faq.svelte';
  import Instruction from './instruction/index.svelte';
  import AdoptedKeys from './children/index.svelte';
  import Consent from './consent.svelte';
  import ChangePassword from './change-password.svelte';
  import { Database } from '../database';

  interface Props {
      database: Database;
  }

  let { database }: Props = $props();
</script>

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
