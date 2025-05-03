<script lang="ts">
  import { passwordStore } from "../stores/local-storage";

  let password = $state("");
</script>

<form class="uk-form-stacked" on:submit|preventDefault={() => $passwordStore = password}>
  <div class="uk-margin">
    <label class="uk-form-label" for="password">Пароль</label>
    <div class="uk-form-controls">
      <input class="uk-input" id="password" type="password" required bind:value={password} />
    </div>
  </div>
  <div class="uk-margin">
    <button class="uk-button uk-button-primary" type="submit">
      Войти
    </button>
  </div>
</form>
