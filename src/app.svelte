<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route, location } from "@wjfe/n-savant";
  import 'uikit/dist/js/uikit';
  import Account from './account/index.svelte';
  import { uuidStore } from './stores/local-storage';

  onMount(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (!hash) {
      if ($uuidStore) {
        location.navigate(`/#/${$uuidStore}`);
      } else {
          window.location.href = origin;
      }
    }
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<Router>
  <Route key="account" path="/:uuid/*">
    {#snippet children(params)}
      {#if params?.uuid}
        <Account uuid={params!.uuid as string} />
      {/if}
    {/snippet}
  </Route>
</Router>