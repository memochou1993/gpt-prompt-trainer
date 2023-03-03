<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <v-app-bar density="compact" color="blue-grey-lighten-5" elevation="2">
    <v-app-bar-title
      class="text-indigo-darken-4 font-weight-medium"
    >
      GPT Prompt Trainer
    </v-app-bar-title>
    <span class="mx-4">
      <RouterLink :to="{ name: 'home' }" active-class="font-weight-medium text-indigo-darken-4">
        Human Mode
      </RouterLink>
    </span>
    <span class="mx-4">
      <RouterLink :to="{ name: 'drone-host' }" active-class="font-weight-medium text-indigo-darken-4">
        Drone Host Mode
      </RouterLink>
    </span>
    <span class="mx-4">
      <a href="https://github.com/memochou1993/gpt-prompt-trainer" target="_blank" rel="noopener noreferrer">
        <v-icon size="x-large">
          mdi-github
        </v-icon>
      </a>
    </span>
  </v-app-bar>
</template>
