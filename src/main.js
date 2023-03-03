import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import VueGtag from 'vue-gtag-next';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(VueGtag, { property: { id: 'G-D07ELLDNWH' } })
  .mount('#app');
