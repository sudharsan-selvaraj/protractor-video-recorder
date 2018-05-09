import * as ws from 'ws';
import * as http from "http";
const url = require('url');
const q = require("q");
import {clientManager} from "../socket-server/clientManager";

let events = ["recordingStarted", "recordingEnded", "sessionIdRecieved"];

export class SocketEvenHandler {

    public clientList:any = {};
    public websocketServer:ws.Server;
    [key:string]:any;

    public registerEvents(wss:ws.Server) {
        this.websocketServer = wss;
        let self = this;

        wss.on("connection", function (ws:any | WebSocket, req:http.IncomingMessage) {
            var queryString = url.parse(req.url, true).query;
            let clientId = queryString.id;
            console.log("Client connected:"+queryString.id);
            self.clientList[queryString.id] = ws;
            clientManager.addClient({
                id: queryString.id,
                sessionId: queryString.sessionId || "",
                connectedOn: new Date(),
                isAlive: true
            });
            ws.on("message", function (message:any) {
                self.dispatchEvents(JSON.parse(message));
            });

            ws.on("close", function (code:number) {
                self.clientClosed(clientId, code);
                console.log("Client connected:"+clientId);
            });

        });
    }


    public refreshClients() {
        let self = this;
        let cleintsWithoutSessions = clientManager.findClientsWithoutSessionId();
        cleintsWithoutSessions.forEach(function (clientDetails:any) {
            self.clientList[clientDetails.id].send(JSON.stringify({event: "getSessionId"}));
        });
        return cleintsWithoutSessions.map((c:any)=>c.id);
    }


    public startRecording(client:any) {
        this.clientList[client.id].send(JSON.stringify({event:"startRecording"}))
    }

    public stopRecording(client:any, filePath:any) {
        this.clientList[client.id].send(JSON.stringify({event:"stopRecording", message: {outPath: filePath}}))
    }

    private dispatchEvents(message:any) {
        this[message.event](message.message);
    }

    private recordingStarted(details:any) {

    }

    private recordingEnded(details:any) {

    }

    private clientClosed(clientId:number, code:number, reason?:string) {
        clientManager.updateClientConnection(clientId, new Date().toString(), reason);
    }

    private sessionIdRecieved(details:any) {
        if (!details.sessionId) {
            return;
        }
        clientManager.addSessionId(details.clientId, details.sessionId);
    }


}