<script lang="ts">
    import { useRouter } from '@dvcol/svelte-simple-router/router';
    import LogoEmoji from '../components/logo-emoji.svelte';

    const router = useRouter();
</script>

<svelte:head>
    <title>AnywhereVPN</title>
</svelte:head>

<h1 class="uk-heading-small uk-text-center"><LogoEmoji/>&nbsp;&nbspAnywhere VPN</h1>
<button class="uk-button uk-button-default uk-width-1-1 uk-margin-top" onclick={() => router.push({ path: '/' })}>🏠 На главную</button>

<h2>Добавить на рабочий стол</h2>
<div class="uk-child-width-1-2@m" uk-grid>
    <div>
        <h3>iPhone (Safari)</h3>
        <ol>
            <li>Нажмите на иконку <b>поделиться</b> внизу экрана</li>
            <li>Нажмите <b>Добавить на главный экран</b></li>
            <li>Нажмите <b>Добавить</b></li>
        </ol>
    </div>
    <div>
        <h3>Android (Chrome)</h3>
        <ol>
            <li>Нажмите на <b>три точки</b> в правом верхнем углу</li>
            <li>Нажмите <b>Добавить на главный экран</b></li>
            <li>Нажмите <b>Добавить</b></li>
        </ol>
    </div>
    <div>
        <h3>Mac (Safari)</h3>
        <ol>
            <li>Нажмите на иконку <b>поделиться</b> в правой верхней части окна</li>
            <li>Нажмите <b>Add to Dock</b></li>
            <li>Нажмите <b>Добавить</b></li>
        </ol>
    </div>
    <div>
        <h3>Любой другой браузер</h3>
        <ol>
            <li>Добавьте текущую страницу в закладки</li>
        </ol>
    </div>
</div>
