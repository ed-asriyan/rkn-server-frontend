<script lang="ts">
    import { location } from '@wjfe/n-savant';
    import LogoEmoji from '../../components/logo-emoji.svelte';
    import { database } from '../../stores/database';
    import Instruction from './instruction.svelte';

    let { uuid }: { uuid: string } = $props();
</script>

<h1 class="uk-heading-small uk-text-center"><LogoEmoji/>&nbsp;&nbspAnywhere VPN</h1>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin" onclick={() => location.navigate(`#/${uuid}`) }>🏠 На главную</button>

{#await $database!.fetchConfig()}
    <div uk-spinner></div>
{:then config} 
    <Instruction config={config!} uuid={uuid}/>
{:catch error}
    <div class="uk-text-danger">Ошибка: {error}</div>
{/await}
