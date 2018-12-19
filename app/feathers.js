import io from 'socket.io-client';
import feathers from '@feathersjs/client';
import findOne from 'feathers-findone';

const socket = io('https://campusropeapi-inbfppnptu.now.sh');
const client = feathers();

client.configure(feathers.socketio(socket, { timeout: 2000 }));
client.configure(findOne());
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  }),
);

export const userService = client.service('users');
export const constantsService = client.service('constants');
export const adminTasksService = client.service('admin-tasks');
export const ngoService = client.service('ngo');
export const trendingNewsService = client.service('trending-news');
export const helplineService = client.service('helpline');

export default client;
