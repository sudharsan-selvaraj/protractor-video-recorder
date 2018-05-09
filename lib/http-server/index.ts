import * as express from "express";
import {RouteHandler} from "./routes/socketRouteHandler";
import * as http from "http";

const bodyParser = require("body-parser");

export class HttpServer {

    public app:express.Application;
    public router:express.Router;
    private PORT:number;
    private expressServerInstance:http.Server;
    private routeHandler:RouteHandler;

    constructor(port?:number) {
        this.app = express();
        this.PORT = port || 5050;
        this.configure();
        this.routes();
    }

    public start() {
        this.expressServerInstance = this.app.listen(this.PORT, this.onServerStarted.bind(this));
    }

    public stop() {
        if (this.expressServerInstance) {
            this.expressServerInstance.close();
        }
    }

    private configure() {
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private routes() {
        this.routeHandler = new RouteHandler();
        this.router = express.Router();
        this.routeHandler.createRoute(this.router);
        this.app.use(this.router)
    }

    /*callbacks*/
    public onServerStarted() {
        console.log("Server Started on port " + this.PORT);
        this.routeHandler.initSocketServer(this.expressServerInstance);
    }

}