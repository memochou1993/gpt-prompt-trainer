<script setup>
import { ref } from 'vue';

defineProps({
  msg: {
    type: String,
    default: '',
  },
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <v-btn type="button" @click="count++">count is {{ count }}</v-btn>
</template>
