import * as express from "express";
import * as http from "http";
import {SocketServer} from "../../socket-server/index";
import {clientManager} from '../../socket-server/clientManager'
export class RouteHandler {


    private socketServer:SocketServer;

    public createRoute(router:express.Router) {
        let self = this;

        router.get("/start/:clientId", function (req:express.Request, res:express.Response, next:express.NextFunction) {
            var clientID = req.params.clientId;
            let client = clientManager.findClient({id: clientID, isAlive: true})[0];
            self.socketServer.evenHandler.startRecording(client);
            res.send("success");
        });

        router.get("/stop/:clientId/:filename", function (req:express.Request, res:express.Response, next:express.NextFunction) {
            var clientID = req.params.clientId;
            let client = clientManager.findClient({id: clientID, isAlive: true})[0];
            self.socketServer.evenHandler.stopRecording(client, req.params.filename);
            res.send("success");
        });

        router.get("/refresh-clients", function (req:express.Request, res:express.Response, next:express.NextFunction) {
            let clientIds = self.socketServer.evenHandler.refreshClients();
            res.status(200).json({message: "Refreshed clients:" + clientIds.join()});
        });

        router.get("/getClientId/:sessionId", function (req:express.Request, res:express.Response, next:express.NextFunction) {
            let sessionId = req.params.sessionId;
            let clients = clientManager.findClient({sessionId: sessionId, isAlive: true});
            res.status(200).json({message: {clientId: clients.length ? clients[0].id : null}});
        });
    }

    public initSocketServer(httpServer:http.Server) {
        this.socketServer = new SocketServer(httpServer);
    }
}