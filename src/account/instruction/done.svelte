<script lang="ts">
    import { location } from '@svelte-router/core';

    let { id }: { id: string } = $props();
</script>


<button class="uk-button uk-button-primary uk-width-1-1" onclick={() => location.navigate(`/${id}/children`)}>Сделать ВПН для друга!</button>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin-top" onclick={() => location.navigate(`/${id}`)}>
    Вернуться на главную
</button>


