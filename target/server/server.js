"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'delivery-api',
                    version: '1.0.0'
                });
                //plugin do restify para exibir os parametros
                this.application.use(restify.plugins.queryParser());
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                //teste barrando requisicoes com i.e7
                this.application.get('/info', [(req, resp, next) => {
                        if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                            //  resp.status(400)
                            //resp.json({message:'Internet explorer 7 nao é suportador'})
                            let error = new Error();
                            error.statusCode = 400;
                            error.message = 'Internet explorer 7 nao suportado';
                            //return next(false);
                            return next(error);
                        }
                        return next();
                    }, (req, resp, next) => {
                        //resp.contentType='application/json';
                        //resp.setHeader('Content-type','application/json')
                        //resp.send({ message: 'hello ' })
                        //   resp.status(200)
                        resp.json({
                            browser: req.userAgent(),
                            method: req.method,
                            url: req.href(),
                            path: req.path(),
                            query: req.query
                        });
                        return next();
                    }]);
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                //o erro nao é tratado aqui pois queremos que a nossa aplic faça um crash
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;