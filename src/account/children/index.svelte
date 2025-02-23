<script lang="ts">
    import { useRouter } from "@dvcol/svelte-simple-router/router";
    import * as UIkit from 'uikit';
    import { Database, AdoptError, type Member, database as databaseStore } from '../../stores/database';
    import ChildModal from './child-modal.svelte';
    import LogoEmoji from "../../components/logo-emoji.svelte";

    let database: Database = $databaseStore;

    const router = useRouter();

    const responseMap: {[x: number]: string } = {
        0: 'Новый ВПН создан',
        1: 'Внутренняя ошибка сервера. Попробуйте позже.',
        2: 'Закончились свободные ключи. Попробуйте через несколько дней.',
        3: 'Вы достигли лимита.',
    };

    let loading: boolean = $state(false);
    const adoptClick = async function(): Promise<void> {
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

    let userModal: Member = $state(null);

    let lastUserModalName: string | null = null;
    $effect(() => {
        if (userModal && lastUserModalName !== userModal?.name) {
            lastUserModalName = userModal?.name;
            refresh();
        }
    });
</script>

<ChildModal bind:member={userModal} database={database} />

<h1 class="uk-heading-small uk-text-center"><LogoEmoji/>&nbsp;&nbspAnywhere VPN</h1>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin-top" onclick={() => router.push({ path: '/' }) }>🏠 На главную</button>

<p>
    Вы можете создавать VPN для семьи, друзей и других людей.
</p>

<p>
    Те, с кем Вы поделились VPN, тоже могут передавать его дальше.
</p>


{#key key}
    {#await Promise.all([database.fetchChildren(), database.descendantsCount()])}
        <div uk-spinner></div>
    {:then [{ children, count: childrenCount }, { count: descendantsCount }]} 
        <div class="uk-card uk-card-default uk-card-body uk-card-small uk-text-left">
            {#if childrenCount === 0}
                <p class="uk-text-bold uk-text-emphasis">Разблокированных людей: {childrenCount} 🔒🌍</p>
                <p>
                    Вы ещё не поделились VPN, но всё впереди!
                </p>  
                <p class="uk-text-bold uk-text-emphasis">
                     Помоги друзьям и семье — создай им ВПН и преврати 0 в 1, 2, 10... и даже 100+! 🚀
                </p>
            {:else}
                {#if descendantsCount === childrenCount}
                    <p class="uk-text-bold uk-text-emphasis">Отличное начало! 🌱</p>
                    <p>
                        Вы уже помогли <b>{descendantsCount} людям</b> получить доступ к интернету!
                    </p>  
                    <p>
                        Как только они поделятся VPN дальше, этот счётчик начнёт расти. <span class="uk-text-bold uk-text-emphasis">Давай посмотрим, сколько людей ты сможешь разблокировать! 🚀</span>
                    </p>
                {:else}
                    <p class="uk-text-bold uk-text-emphasis">Вы разблокировали интернет для {descendantsCount} человек! 🔥🌍</p>
                    <p>
                        Вы помоги <b>{childrenCount} людям</b> получить доступ к сети! Они передали VPN дальше, и теперь <b>{descendantsCount} человек</b> свободно пользуются интернетом <b>благодаря Вам</b>.
                    </p>  
                    <p class="uk-text-bold uk-text-emphasis">
                        Продолжай делиться и увеличивай этот счётчик! 🚀
                    </p>
                {/if}
            {/if}
        </div>
        
        <button class="uk-button uk-button-large uk-button-primary uk-width-1-1 uk-margin-top" onclick={() => adoptClick()}>
            🤙 Создать ВПН
        </button>
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
                                    <span class="uk-text-truncate uk-butdton uk-link uk-text-muted" onclick={() => userModal = child}>{child.name || child.uuid}</span>
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
