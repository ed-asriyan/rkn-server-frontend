<script lang="ts">
  import { location } from '@svelte-router/core';
  import Consent from './consent.svelte';
  import LogoEmoji from '../components/logo-emoji.svelte';
  import ChangePassword from './change-password.svelte';
  import AddToHomeScreenModal from "./add-to-home-screen-modal.svelte";
  import { supportTelegramLink, supportSimplexLink } from "../config";
  import type { DescendantsStore } from "../stores/descendants-store";
  import type { SupabaseClient } from "@supabase/supabase-js";

  interface Params {
    id: string;
    descendantsStore: DescendantsStore;
    supabase: SupabaseClient;
  }

  const { id, descendantsStore, supabase }: Params = $props();

  let count = $derived(descendantsStore.count);

  let showPasswordModal = $state(false);
  let showAddToHomeScreenModal = $state(false);

  const isPwa = (() => {
    const mqStandAlone = '(display-mode: standalone)';
    // @ts-ignore
    if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
      return true;
    } else {
      return false;
    }
  })();
</script>

<h1 class="uk-heading-large uk-text-center"><LogoEmoji/></h1>
<h1 class="uk-heading-small uk-text-center">Anywhere VPN</h1>
<div class="text-muted text-center uk-margin-bottom uk-text-center">Безопасный и анонимный ВПН</div>

<Consent />
<ChangePassword bind:show={showPasswordModal} {supabase}/>
<AddToHomeScreenModal bind:show={showAddToHomeScreenModal} />

<div class="uk-grid-column-small uk-child-width-1-1@s uk-child-width-1-2@s" uk-grid>
  <div>
    <div class="uk-card uk-card-primary uk-card-hover uk-card-body uk-card-small cursor uk-text-left" onclick={() => location.navigate(`/${id}/instruction`)}>
      <h5 class="uk-card-title">🚀&nbsp;&nbsp;Подключить ВПН</h5>
      <p>Доступно гигабайт: <b>∞</b></p>
    </div>
  </div>
  <div>
    <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-card-small cursor uk-text-left" onclick={() => location.navigate(`/${id}/children`)}>
      <h5 class="uk-card-title">👥&nbsp;&nbsp;Поделиться ВПНом</h5>
      <p>Вы <b>разблокировали</b> интернет <b>{ $count }</b> людям</p>
    </div>
  </div>
  <div>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-card-small uk-text-left">
      <h5 class="uk-card-title">🤯&nbsp;&nbsp;Не подключается?</h5>
      <p>Напиши в <a href={supportSimplexLink} target="_blank">SimpleX</a> или в <a href={supportTelegramLink} target="_blank">Telegram</a></p>
    </div>
  </div>
  <div>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-card-small cursor uk-text-left" onclick={() => location.navigate(`/${id}/faq`)}>
      <h5 class="uk-card-title">❓&nbsp;&nbsp;FAQ</h5>
      <p>Ответы на вопросы</p>
    </div>
  </div>
  <div>
    <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-card-small cursor uk-text-left" onclick={() => showPasswordModal = true}>
      <h5 class="uk-card-title">🔐&nbsp;&nbsp;Сменить пароль</h5>
      <p>Чтобы никто не украл Ваш ВПН</p>
    </div>
  </div>
  {#if !isPwa}
    <div>
      <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-card-small cursor uk-text-left" onclick={() => showAddToHomeScreenModal = true}>
        <h5 class="uk-card-title">💾&nbsp;&nbsp;Добавить на рабочий стол</h5>
        <p>Чтобы не потерять ВПН</p>
      </div>
    </div>
  {/if}
</div>
