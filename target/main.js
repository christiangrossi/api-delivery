"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_router_1 = require("./usuarios/usuario.router");
const server_1 = require("./server/server");
const restaurantes_router_1 = require("./restaurantes/restaurantes.router");
const avaliacao_router_1 = require("./avaliacoes/avaliacao.router");
const server = new server_1.Server();
server.bootstrap([usuario_router_1.usuarioRouter, restaurantes_router_1.restaurantesRouter, avaliacao_router_1.avaliacaRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
