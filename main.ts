import { usuarioRouter } from './usuarios/usuario.router'
import { Server } from './server/server';
import { restaurantesRouter } from './restaurantes/restaurantes.router';
import { avaliacaRouter } from './avaliacoes/avaliacao.router';

const server = new Server()

server.bootstrap([usuarioRouter, restaurantesRouter,avaliacaRouter]).then(server => {
    console.log('Server is listening on:', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error);
    process.exit(1)
})






