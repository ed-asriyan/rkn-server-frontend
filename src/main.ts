import { mount } from 'svelte';
import { init } from "@wjfe/n-savant";
import './app.scss';
import App from './app.svelte';

init({ implicitMode: 'hash' });

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app;
