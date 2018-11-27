import io from 'socket.io-client';
import feathers from '@feathersjs/client';

const socket = io('http://localhost:3030');
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  }),
);

export const userService = client.service('users');
export const constantsService = client.service('constants');
export default client;
