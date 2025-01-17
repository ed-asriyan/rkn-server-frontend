<script lang="ts">
  import 'uikit/dist/js/uikit';
  import { fetchConfig } from './config';
  import SignIn from './sign-in.svelte';

</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

{#await fetchConfig()}
  <div uk-spinner></div>
{:then config} 
  <SignIn config={config}/>
{:catch}
  <script>
    window.location.href = '/';
  </script>
{/await}
