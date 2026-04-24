import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';
import { errors } from 'undici-types';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error('Missing STREAM_API_KEY or STREAM_API_SECRET');
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamtUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log('Stream user upsertd successfully:', userData);
  } catch (error) {
    console.error('Error upserting Stream user:', error);
    throw error;
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log('Stream user deleted successfully:', userId);
  } catch (error) {
    console.error('Error deleting Stream user:', error);
    throw error;
  }
};

//todo: add anothermethod to generate token 