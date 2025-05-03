<script lang="ts">
    import * as UIkit from 'uikit';

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
        <div class="uk-margin">
            <button class="uk-button uk-button-default" onclick={() => { show = false }}>закрыть</button>
        </div>
    </div>
</div>
