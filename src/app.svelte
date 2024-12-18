<script lang="ts">
  import { onMount } from 'svelte';
  import 'uikit/dist/js/uikit';
  import Faq from './faq.svelte';
  import Instruction from './instruction.svelte';

  let hash: string = $state('');

  onMount(() => {
      hash = parseHash();

      if (!hash) {
          quit();
      }
  });

  const parseHash = function(): string {
      if (!parseHash.value) {
          parseHash.value = window.location.hash.substring(1);
          // invalidate location so that users cannot share personal links
          window.history.pushState({}, '', '/#do-not-share-your-personal-link');
      }
      return parseHash.value;
  };

  const quit = function () {
      window.location.href = '/';
  };
</script>

<svelte:head>
  <title>ВПН</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<div class="uk-section uk-section-default">
  <div class="uk-container">
      <div class="uk-text-bold uk-text-center uk-grid-match uk-child-width-1-2@m" uk-grid>
        <div class="uk-text-primary">Если ты читаешь этот текст, то у тебя есть персональный ВПН.</div>
        <div class="uk-text-danger">Эта ссылка — персональная, не публикуй её в интернете и не передавай её другим людям.</div>
      </div>
  </div>
</div>

<div class="uk-section uk-section-muted">
  <div class="uk-container">
    <Instruction uuid={hash}/>
  </div>
</div>

<div class="uk-section uk-section-primary uk-light">
  <div class="uk-container">
    <Faq/>
  </div>
</div>
