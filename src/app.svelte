<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route, location } from '@svelte-router/core';
  import 'uikit/dist/js/uikit';
  import Account from './account/index.svelte';
  import { idStore } from './stores/auth';

  onMount(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (!hash) {
      if ($idStore) {
        location.navigate(`/#/${$idStore}`);
      } else {
        window.location.href = origin;
      }
    } else {
      const searchParams = new URLSearchParams(hash);
      if (searchParams.has('uuid')) {
          const id = searchParams.get('uuid')!;
          window.location.href = `/#/${id}`;
      }
    }
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<Router>
  <Route key="account" path="/:id/*">
    {#snippet children({ rp })}
      {#if rp?.id}
        <Account id={rp!.id as string} />
      {/if}
    {/snippet}
  </Route>
</Router>