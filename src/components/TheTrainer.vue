<script setup>
import { computed, reactive } from 'vue';
import {
  createCompletion,
  createClient,
  ROLE_ASSISTANT,
  ROLE_SYSTEM,
  ROLE_USER,
} from '../services/openai';

const data = reactive({
  key: window.atob(localStorage.getItem('key') || ''),
  systemPrompt: localStorage.getItem('systemPrompt') || '這是一個繁體中文的對話。',
  userPrompt: localStorage.getItem('userPrompt') || '請你扮演一隻可愛的柴犬，你要很熱情地和主人打招呼。',
  testSentences: localStorage.getItem('testSentences') || '你是什麼？\n你是一隻貓！\n你吃貓罐頭嗎？\n',
  messages: [],
  error: '',
});

const initMessages = computed(() => [
  { role: ROLE_SYSTEM, content: data.systemPrompt },
  { role: ROLE_USER, content: data.userPrompt },
]);

const dialogue = computed(() => initMessages.value.concat(data.messages).map((message) => `${message.role}: ${message.content}`).join('\n'));

const remember = (key, value) => localStorage.setItem(key, value);

const rememberKey = () => localStorage.setItem('key', window.btoa(data.key));

const run = async () => {
  data.messages = [];
  const client = createClient(data.key);
  try {
    const sentences = data.testSentences.split('\n').filter((sentence) => !!sentence);
    for await (const sentence of sentences) {
      data.messages.push({ role: ROLE_USER, content: sentence });
      const result = await createCompletion(client)({
        messages: initMessages.value.concat(data.messages),
      });
      const { choices } = result.data;
      const [choice] = choices;
      const { message } = choice;
      data.messages.push({ role: ROLE_ASSISTANT, content: message.content.trim() });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (err) {
    data.error = err?.response?.data?.error?.message || err.message;
  }
};
</script>

<template>
  <v-snackbar
    v-if="data.error"
    color="indigo-lighten-1"
    model-value
    @update:modelValue="data.error = ''"
  >
    {{ data.error }}
  </v-snackbar>
  <v-row class="justify-center">
    <v-col cols="12" sm="10" md="6">
      <v-card
        color="blue-grey-lighten-5"
        height="100%"
      >
        <v-card-item class="pa-8">
          <div class="text-h5 mb-4 font-weight-bold text-indigo">
            Test
          </div>
          <div class="my-4">
            <div class="text-subtitle-2 mb-2">
              System Prompt
            </div>
            <div>
              <v-textarea
                v-model="data.systemPrompt"
                autofocus
                color="indigo"
                hide-details
                no-resize
                rows="4"
                variant="outlined"
                @input="remember('systemPrompt', data.systemPrompt)"
              />
            </div>
          </div>
          <div class="my-4">
            <div class="text-subtitle-2 mb-2">
              User Prompt
            </div>
            <div>
              <v-textarea
                v-model="data.userPrompt"
                color="indigo"
                hide-details
                no-resize
                rows="4"
                variant="outlined"
                @input="remember('userPrompt', data.userPrompt)"
              />
            </div>
          </div>
          <div class="my-4">
            <div class="text-subtitle-2 mb-2">
              Test Sentences
            </div>
            <div>
              <v-textarea
                v-model="data.testSentences"
                color="indigo"
                hide-details
                no-resize
                rows="4"
                variant="outlined"
                @input="remember('testSentences', data.testSentences)"
              />
            </div>
          </div>
          <div class="my-4">
            <div class="text-subtitle-2 mb-2">
              API Key
            </div>
            <div>
              <v-text-field
                v-model="data.key"
                color="indigo"
                density="compact"
                hide-details
                type="password"
                variant="outlined"
                @input="rememberKey"
              />
            </div>
          </div>
        </v-card-item>
        <v-card-actions class="justify-end pa-8 pt-0">
          <v-btn
            block
            color="indigo"
            variant="outlined"
            @click="run"
          >
            Run
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="10" md="6">
      <v-card
        color="blue-grey-lighten-5"
        height="100%"
      >
        <v-card-item class="pa-8">
          <div class="text-h5 mb-4 font-weight-bold text-indigo">
            Result
          </div>
          <div class="my-4">
            <div class="text-subtitle-2 mb-2">
              Dialogue
            </div>
            <div>
              <v-textarea
                :model-value="dialogue"
                color="indigo"
                hide-details
                no-resize
                rows="20"
                variant="outlined"
              />
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
