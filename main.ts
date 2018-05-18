import { usersRouter } from './users/users.router'
import { Server } from './server/server';
import { restaurantesRouter } from './restaurantes/restaurantes.router';

const server = new Server()

server.bootstrap([usersRouter, restaurantesRouter]).then(server => {
    console.log('Server is listening on:', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error);
    process.exit(1)
})






