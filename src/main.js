import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import 'vuetify/styles';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount('#app');
