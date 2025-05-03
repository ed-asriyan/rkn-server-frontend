<script lang="ts">
    import * as UIkit from 'uikit';
    import { detect } from 'detect-browser';
    import isMobileCheck from 'is-mobile';

    type Browser = 'safari' | 'chrome' | 'unknown';
    const isMobile: boolean = isMobileCheck();

    const browser: Browser = (() => {
        switch (detect()?.name) {
            case 'safari':
                return 'safari';
            case 'chrome':
                return 'chrome';
            default:
                return 'unknown';
        }
    })();

    let { show = $bindable() } = $props();

    let modal = $state(null);

    $effect(() => {
        if (show) {
            UIkit.modal(modal).show();
        } else {
            UIkit.modal(modal).hide();
        }
    });
</script>

<div bind:this={modal} uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2>Добавить на рабочий стол</h2>
        <ul uk-accordion>
            <li class:uk-open={browser === 'safari' && isMobile}>
                <a class="uk-accordion-title" href>Safari (iPhone)</a>
                <div class="uk-accordion-content">
                    <ol>
                        <li><p>Нажмите на иконку <b>поделиться</b> внизу экрана</p></li>
                        <li><p>Нажмите <b>Добавить на главный экран</b></p></li>
                        <li><p>Нажмите <b>Добавить</b></p></li>
                    </ol>
                </div>
            </li>
            <li class:uk-open={browser === 'safari' && !isMobile}>
                <a class="uk-accordion-title" href>Safari (macOS)</a>
                <div class="uk-accordion-content">
                    <ol>
                        <li><p>Нажмите на иконку <b>поделиться</b> справа от адресной строки</p></li>
                        <li><p>Нажмите <b>Add to doc</b></p></li>
                        <li><p>Нажмите <b>Add</b></p></li>
                    </ol>
                </div>
            </li>
            <li class:uk-open={browser === 'chrome' && isMobile}>
                <a class="uk-accordion-title" href>Chrome (phone)</a>
                <div class="uk-accordion-content">
                    <ol>
                        <li><p>Нажмите на <b>три точки</b> в правом верхнем углу</p></li>
                        <li><p>Нажмите <b>Добавить на главный экран</b></p></li>
                        <li><p>Нажмите <b>Установить</b></p></li>
                    </ol>
                </div>
            </li>
            <li class:uk-open={browser === 'chrome' && !isMobile}>
                <a class="uk-accordion-title" href>Chrome (desktop)</a>
                <div class="uk-accordion-content">
                    <ol>
                        <li><p>Нажмите на иконку <b>установки</b> справа от адресной строки</p></li>
                        <li><p>Нажмите <b>Установить</b></p></li>
                    </ol>
                </div>
            </li>
            <li class:uk-open={browser === 'unknown'}>
                <a class="uk-accordion-title" href>Другие браузеры</a>
                <div class="uk-accordion-content">
                    <ol>
                        <li>Добавьте текущую страницу в закладки</li>
                    </ol>
                </div>
            </li>
        </ul>
        <div class="uk-margin">
            <button class="uk-button uk-button-default" onclick={() => { show = false }}>закрыть</button>
        </div>
    </div>
</div>
