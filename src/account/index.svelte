<script lang="ts">
  import { Router, Route } from '@svelte-router/core';
  import SignIn from './sign-in.svelte';
  import { authSupabase, passwordStore, uuidStore } from '../stores/auth';
  import { supabaseKey, supabaseUrl, version } from '../config';
  import Home from "./home.svelte";
  import Instruction from "./instruction/index.svelte";
  import Children from "./children/index.svelte";
  import Faq from "./faq.svelte";
  import Pwa from "./pwa.svelte";
  import type { SupabaseClient } from "@supabase/supabase-js";
  import { UsersStore } from "../stores/users-store";
  import { DescendantsStore } from "../stores/descendants-store";
  import { ConfigsStore } from "../stores/configs-store";
  import { UsersService } from "../stores/users-service";
  import { DescendantsService } from "../stores/descendants-service";
  import { ConfigsService } from "../stores/configs-service";

  interface Params {
    uuid: string;
  }
  const { uuid }: Params = $props();
  $uuidStore = uuid;

  let supabase: SupabaseClient | null = $state(null);

  const usersStore = new UsersStore();
  const descendantsStore = new DescendantsStore();
  const configsStore = new ConfigsStore();

  let usersService: UsersService | null = $state(null);
  let descendantsService: DescendantsService | null = $state(null);
  let configsService: ConfigsService | null = $state(null);

  let firstLoad = true;
  let didTryUuid = false;

  const login = async function(uuid: string): Promise<void> {
    if (!$passwordStore) {
      didTryUuid = true;
      setTimeout(() => $passwordStore = uuid, 100);
    } else if (!supabase) {
      try {
        supabase = await authSupabase(supabaseUrl, supabaseKey, uuid, $passwordStore);

        usersService = new UsersService(supabase, usersStore, descendantsStore, uuid);
        descendantsService = new DescendantsService(supabase, uuid, descendantsStore);
        configsService = new ConfigsService(supabase, configsStore);

        await Promise.all([
          usersService.fetch(),
          descendantsService.fetch(),
          configsService.fetch()
        ]);
      } catch (e) {
        console.error(e);
        if (!didTryUuid) {
          didTryUuid = true;
          setTimeout(() => $passwordStore = uuid, 100);
        } else if (firstLoad) {
          firstLoad = false;
        } else {
          alert('Пароль неверный');
        }
      }
    }
  };
</script>

<div class="container">
  <div class="uk-container uk-container-xsmall uk-margin-top">
    <div class="uk-container uk-container-xsmall">
      <div class="uk-flex uk-flex-center uk-flex-middle" style="min-height: 100vh;">
        {#key $passwordStore}
          {#await login(uuid)}
            <div uk-spinner="ratio: 1" class="uk-margin-right"></div>
            Думаю думалку...
          {:then _}
            {#if supabase && usersService && descendantsService && configsService}
              <Pwa uuid={uuid} />
              <div>
                <Router>
                  <Route key="home" path="/:uuid">
                    <Home uuid={uuid} {descendantsStore} {supabase} />
                  </Route>
                  <Route key="instruction" path="/:uuid/instruction">
                    <Instruction uuid={uuid} {configsStore} />
                  </Route>
                  <Route key="children" path="/:uuid/children">
                    <Children uuid={uuid} {descendantsStore} {usersStore} {usersService} />
                  </Route>
                  <Route key="faq" path="/:uuid/faq">
                    <Faq uuid={uuid} />
                  </Route>
                </Router>

                <div class="uk-text-center uk-margin-large-top uk-text-small">
                  User ID:<br/><b>{uuid}</b>
                </div>
                <div class="uk-text-center uk-margin-top uk-margin-bottom uk-text-small">
                  Website version:<br/><b>{version}</b>
                </div>
              </div>
            {:else}
              <SignIn />
            {/if}
          {/await}
        {/key}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  :global(html) {
    background-color: #f4f4f4;
  }
</style>
