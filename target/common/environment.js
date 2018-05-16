"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//localhost teste
//db: { url: process.env.DB_URL || 'mongodb://localhost/api-delivery' },
exports.environment = {
    server: { port: process.env.PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://root:root@ds259325.mlab.com:59325/api-delivery' },
    security: { saltRounds: process.env.SALT || 10 }
};
