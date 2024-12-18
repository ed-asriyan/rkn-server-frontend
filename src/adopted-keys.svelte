<script lang="ts">
    import { adoptUuid } from './database';

    interface Props {
        uuid: string;
    }

    let { uuid }: Props = $props();

    const adoptClick = function(): void {
        console.log(adoptUuid(uuid));
    };
</script>

<h2>Выдать ключи знакомым</h2>
<p>Ты можешь выдать ключи знакомым: друзьям, родителям, семье и т.д. Для этого</p>
<div class="uk-child-width-1-2@m" uk-grid>
    <div>
        <h3>Выданные ключи:</h3>
        <button class="uk-button uk-button-primary uk-button-large" onclick={adoptClick}>Выдать ключи</button>
    </div>
    <div>
        <h3>Выданные ключи:</h3>
    </div>
</div>

