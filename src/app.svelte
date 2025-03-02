<script lang="ts">
  import 'uikit/dist/js/uikit';
  import { fetchConfig } from './config';
  import SignIn from './sign-in.svelte';
  import { configurationStore } from './stores/configuration';

  const fetchConfigWrap = async function () {
    const config = await fetchConfig();
    if (config.origin !== window.location.origin) {
      const newUrl = new URL(config.origin);
      newUrl.pathname = window.location.pathname;
      newUrl.search = window.location.search;
      newUrl.hash = '?' + Object.entries($configurationStore).map(([key, value]) => `${key}=${value}`).join('&');
      window.location.replace(newUrl.toString());
    }
    return config;
  };
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

{#await fetchConfigWrap()}
  <div uk-spinner></div>
{:then config} 
  <SignIn config={config}/>
{:catch}
  <script>
    window.location.href = '/';
  </script>
{/await}
