import EventBus from './event-bus';

export default class WSTransport {

    static EVENTS: Record<string, string> = {
        MESSAGE: 'message'
    };

    private eventBus: EventBus;

    private socket: WebSocket;

    private pingInterval: number | null;

    private ping: number;

    constructor(url: string, ping: number = 5000) {
        this.eventBus = new EventBus();
        this.socket = new WebSocket(url);
        this.pingInterval = null;
        this.ping = ping;

        this.socket.addEventListener('open', this.handleOpen);
        this.socket.addEventListener('message', this.handleMessage);
        this.socket.addEventListener('close', this.handleClose);
        this.socket.addEventListener('error', this.handleError);
    }

    public get isOpen(): boolean {
        return this.socket.readyState !== WebSocket.CLOSED;
    }

    private handleOpen = () => {
        this.getOldMessages();
        this.startPing();
    };

    private handleMessage = (event: MessageEvent) => {
        try {
            const message = JSON.parse(event.data);
            this.eventBus.emit(WSTransport.EVENTS.MESSAGE, message);
        } catch (error) {
            console.error(error);
        }
    };

    private handleClose = () => {
        this.stopPing();
    };

    private handleError = (error: Event) => {
        console.error(error);
    };

    private startPing() {
        const message = {
            type: 'ping'
        };

        this.pingInterval = setInterval(() => {
            this.socket.send(JSON.stringify(message));
        }, this.ping);
    }

    private stopPing() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }

    public sendMessage(content: string = '') {
        const message = {
            content,
            type: 'message'
        };

        this.socket.send(JSON.stringify(message));
    }

    public getOldMessages(offset: number = 0) {
        const request = {
            content: offset.toString(),
            type: 'get old'
        };

        this.socket.send(JSON.stringify(request));
    }

    public close() {
        this.socket.close();
    }

    public onMessage(callback: Function) {
        this.eventBus.on(WSTransport.EVENTS.MESSAGE, callback);
    }

    public offMessage(callback: Function) {
        this.eventBus.off(WSTransport.EVENTS.MESSAGE, callback);
    }

}
