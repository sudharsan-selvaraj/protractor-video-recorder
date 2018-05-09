import * as ws from "ws";
import * as http from "http";
import {SocketEvenHandler} from "./eventHandler"

export class SocketServer {

    public wsServer:ws.Server;
    public httpServer:http.Server;
    public evenHandler:SocketEvenHandler;

    constructor(httpServer:http.Server) {
        this.httpServer = httpServer;
        let sockerServerOptions = {
            server: httpServer,
            connectSources: ["self", "ws://localhost:" + this.httpServer.address().port]
        };
        this.wsServer = new ws.Server(sockerServerOptions);
        this.registerEvents();
    }

    public getInstance() {
        if (!this.wsServer) {
            this.wsServer = new ws.Server({server: this.httpServer});
        }
        return this.wsServer;
    }

    private registerEvents() {
        this.evenHandler = new SocketEvenHandler();
        this.evenHandler.registerEvents(this.wsServer);
    }


}