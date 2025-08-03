<script lang="ts">
  import { onMount } from 'svelte';
  import { passwordStore } from '../stores/auth';

  let password = $state("");
  let passwordInput: HTMLInputElement | null = $state(null);

  const focusPasswordInput = () => {
    if (passwordInput) {
      passwordInput.focus();
    }
  };

  const onSubmit = (event: Event) => {
    event.preventDefault();
    $passwordStore = password;
    focusPasswordInput();
  };

  onMount(() => {
    focusPasswordInput();
  });
</script>

<form class="uk-form-stacked" onsubmit={onSubmit}>
  <div class="uk-margin">
    <label class="uk-form-label" for="password">Пароль</label>
    <div class="uk-form-controls">
      <input class="uk-input" id="password" type="password" required bind:value={password} bind:this={passwordInput} />
    </div>
  </div>
  <div class="uk-margin">
    <button class="uk-button uk-button-primary" type="submit">
      Войти
    </button>
  </div>
</form>
