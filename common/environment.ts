
//localhost teste
//db: { url: process.env.DB_URL || 'mongodb://localhost/api-delivery' },
export const environment = {
    server: { port: process.env.PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://root:root@ds259325.mlab.com:59325/api-delivery' },
    security: { saltRounds: process.env.SALT || 10 }
}