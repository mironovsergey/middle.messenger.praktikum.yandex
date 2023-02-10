export default class EventBus {

    listeners: { [event: string]: Function[] } = {};

    on(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }

}
