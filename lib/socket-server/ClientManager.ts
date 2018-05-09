var loki = require("lokijs");
let db = new loki("transactions.json");
export class clientManager {

    private static clients = db.addCollection('clients', {indices: ['id', 'sessionId', 'connectedOn', 'closedOn','isAlive']});

    public static addClient(clientDetails:any) {
        clientManager.clients.insert(clientDetails);
    }

    public static addSessionId(clientId:number, sessionId:string) {
        let client = clientManager.findClient({id:clientId})[0];
        client.sessionId = sessionId;
        clientManager.clients.update(client);
    }
    
    public static updateClientConnection(clientId:number,closedOn:string,reason?:string) {
        let client = clientManager.findClient({id:clientId});
        client.closedOn = closedOn;
        client.closedReason = reason || "";
        client.isAlive = false;
        clientManager.clients.update(client);
    }

    public static findClient(query:any) {
        return clientManager.clients.find(query);
    }

    public static findClientsWithoutSessionId() {
        return clientManager.clients.find({'sessionId': {'$eq': ''}});
    }
}