<script lang="ts">
    import { location } from '@wjfe/n-savant';

    let { uuid }: { uuid: string } = $props();
</script>


<button class="uk-button uk-button-secondary uk-width-1-1" onclick={() => location.navigate(`#/${uuid}/children`)}>Сделать ВПН для друга!</button>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin-top" onclick={() => location.navigate(`#/${uuid}`)}>
    Вернуться на главную
</button>


