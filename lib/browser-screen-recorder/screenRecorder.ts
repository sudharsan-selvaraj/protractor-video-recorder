import {HttpServer} from "../http-server/index"

export class BrowserScreenRecorder {

    private options:any;
    private server:HttpServer;

    constructor(options:any) {
        this.options = options || {};

        if (!this.options.port) {
            this.options.port = 5050;
        }
        this.server = new HttpServer(this.options.port);
    }

    public init() {
        this.server.start();
    }

    public close() {
        this.server.stop();
    }

}