import axios from 'axios';

export const ROLE_ASSISTANT = 'assistant';
export const ROLE_SYSTEM = 'system';
export const ROLE_USER = 'user';

export const FINISH_REASON_LENGTH = 'length';
export const FINISH_REASON_STOP = 'stop';

const createClient = (key) => axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: `Bearer ${key}`,
  },
});

const createCompletion = (client) => ({
  messages,
}) => client.post('/v1/chat/completions', {
  model: 'gpt-3.5-turbo',
  messages,
});

export {
  createClient,
  createCompletion,
};
