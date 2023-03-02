<script setup>
import { RouterView } from 'vue-router';
import TheFooter from './components/TheFooter.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <v-app>
    <TheHeader />
    <v-main class="bg-blue-grey-lighten-1">
      <v-container class="py-12">
        <RouterView />
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>
