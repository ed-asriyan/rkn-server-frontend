<script lang="ts">
  import * as UIkit from 'uikit';
  import { onMount } from 'svelte';

  let modal = $state(null);

  onMount(() => {
    UIkit.modal(modal).show();
  });
  
  const close = function(): void {
    UIkit.modal(modal).hide();
  };
</script>

<div bind:this={modal} class="uk-flex-top" uk-modal>
  <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
    <div class="uk-text-primary uk-margin-bottom">Если ты читаешь этот текст, то у тебя есть персональный ВПН.</div>
    <div class="uk-text-danger uk-margin-bottom">Эта ссылка — персональная, не публикуй её в интернете и не передавай её другим людям.</div>
    <div class="uk-text-primary uk-margin-bottom">Одним ВПНом (одной ссылкой) может пользоваться только один человек.</div>
    <div class="uk-text-danger uk-margin-bottom">Этой ссылкой делиться нельзя. В интернет выкладывать тоже.</div>
    <div class="uk-text-primary">Чтобы подключить друзей/знакомых к ВПН, воспользуйся функцональностью "Сгенерировать ВПН для друзей и знакомых" на этой странице.</div>

    <button class="uk-button uk-button-secondary uk-width-1-1 uk-margin-top" type="button" onclick={close}>Понял!</button>
  </div>
</div>
