"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const error_handler_1 = require("./error.handler");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'delivery-api',
                    version: '1.0.0'
                });
                //plugin do restify para exibir os parametros
                this.application.use(restify.plugins.queryParser());
                //fazendo o parser do req body
                this.application.use(restify.plugins.bodyParser());
                //parser path+
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
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
                this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
