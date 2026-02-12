import { mount } from 'svelte';
import { init } from '@svelte-router/core';
import './app.scss';
import App from './app.svelte';

init({ implicitMode: 'hash', defaultHash: true });

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app;
