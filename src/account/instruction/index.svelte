<script lang="ts">
    import { useRouter } from '@dvcol/svelte-simple-router/router';
    import LogoEmoji from '../../components/logo-emoji.svelte';
    import { database } from '../../stores/database';
    import Instruction from './instruction.svelte';

    const router = useRouter();

</script>

<h1 class="uk-heading-small uk-text-center"><LogoEmoji/>&nbsp;&nbspAnywhere VPN</h1>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin" onclick={() => router.push({ path: '/' }) }>🏠 На главную</button>

{#await $database?.fetchConfig()}
    <div uk-spinner></div>
{:then config} 
    <Instruction config={config}/>
{/await}
