<script lang="ts">
    import * as UIkit from 'uikit';
    import { Database, AdoptError, type User } from '../../database';
    import ChildModal from './child-modal.svelte';

    interface Props {
        database: Database;
    }

    let { database }: Props = $props();

    const responseMap: {[x: number]: string } = {
        0: 'Новый ВПН создан',
        1: 'Внутренняя ошибка сервера. Попробуйте позже.',
        2: 'Закончились свободные ключи. Попробуйте через несколько дней.',
        3: 'Вы достигли лимита.',
    };

    let loading: boolean = $state(false);
    const adoptClick = async function(database: Database): Promise<void> {
        try {
            loading = true;
            const name = prompt('Введите имя нового пользователя ВПН (имя будет видно только вам):');
            if (name) {
                userModal = await database.adopt(name);
                UIkit.notification('Новый ВПН создан', { status: 'success' });
            }
        } catch (e) {
            console.error(e);
            if (e instanceof AdoptError) {
                alert(responseMap[e.code]);
            } else {
                alert('Ошибка');
            }
        } finally {
            loading = false;
        }
    };

    let key = $state(0);
    const refresh = function(): void {
        ++key;
    };

    let userModal: User = $state(null);

    let lastUserModalName: string | null = null;
    $effect(() => {
        if (userModal && lastUserModalName !== userModal?.name) {
            lastUserModalName = userModal?.name;
            refresh();
        }
    });
</script>

<h2>👥 Сгенерировать ВПН</h2>
<p>Ты можешь создать новый ВПН и поделиться им с другим человеком. Для этого нажми на кнопку:</p>
<div class="uk-text-center">
    {#if loading}
        <span uk-spinner></span>
    {:else}
        <button class="uk-widt1 uk-button uk-button-primary" onclick={() => adoptClick(database)}>🔄 Сгенерировать ВПН 🔄</button>
    {/if}
</div>

<hr/>

<ChildModal bind:user={userModal} database={database} />

{#key key}
    {#await database.fetchChildren()}
        <div uk-spinner></div>
    {:then { children, count }} 
        <p class="uk-text-center uk-text-bold">
            {#if children.length > 0}
                Всего ты сгенерировал(а) {count} ВПН
            {:else}
                Ты ещё не сгенерировал(а) ни одного ВПН
            {/if}
            </p>
        {#if children.length > 0}
            <div style="overflow-x: auto;">
                <table class="uk-table uk-table-small uk-table-divider">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Дата пригашения</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each children.sort((a, b) => +a.createdAt - +b.createdAt) as child, i}
                            <tr>
                                <th>{i + 1}</th>
                                <td>
                                    <button class="uk-button uk-button-default uk-button-small uk-text-truncate" onclick={() => userModal = child}>Открыть</button>
                                    &nbsp;
                                    <span class="uk-text-truncate uk-butdton uk-link uk-text-muted" onclick={() => userModal = child}>{child.name || child.childUuid}</span>
                                </td>
                                <td>{child.createdAt.toLocaleString()}</td>
                            </tr>
                        {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        {/if}
    {:catch e}
        <div>Ошибка :(</div>
        <button class="uk-button uk-button-primary" onclick={refresh}>Обновить</button>
    {/await}
{/key}

<style lang="scss">
    table {
        max-width: 100vw;
        overflow-x: scroll;
    }
</style>