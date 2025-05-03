<script lang="ts">
  import { Router, Route } from "@wjfe/n-savant";
  import { Database, database } from '../stores/database';
  import SignIn from './sign-in.svelte';
  import { passwordStore, uuidStore } from '../stores/local-storage';
  import { supabaseKey, supabaseUrl, version } from '../config';
  import Home from "./home.svelte";
  import Instruction from "./instruction/index.svelte";
  import Children from "./children/index.svelte";
  import Faq from "./faq.svelte";
  import AddToHomeScreen from "./add-to-home-screen.svelte";

  interface Params {
    uuid: string;
  }
  const { uuid }: Params = $props();
  $uuidStore = uuid;

  let firstLoad = true;
  let didTryUuid = false;

  const login = async function(uuid: string): Promise<void> {
    if (!$passwordStore) {
      didTryUuid = true;
      $passwordStore = uuid;
    } else if (!$database) {
      try {
        $database = await Database.connect(supabaseUrl, supabaseKey, uuid, $passwordStore);
      } catch (e) {
        console.error(e);
        if (!didTryUuid) {
          didTryUuid = true;
          $passwordStore = uuid;
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
            {#if $database}
              <div>
                <Router>
                  <Route key="home" path="/:uuid">
                    <Home uuid={uuid} />
                  </Route>
                  <Route key="instruction" path="/:uuid/instruction">
                    <Instruction uuid={uuid} />
                  </Route>
                  <Route key="children" path="/:uuid/children">
                    <Children uuid={uuid} />
                  </Route>
                  <Route key="faq" path="/:uuid/faq">
                    <Faq uuid={uuid} />
                  </Route>
                  <Route key="add-to-home-screen" path="/:uuid/add-to-home-screen">
                    <AddToHomeScreen uuid={uuid} />
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
