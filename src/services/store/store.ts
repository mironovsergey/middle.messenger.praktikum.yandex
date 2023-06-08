import type { Indexed } from '../../utils/types';
import EventBus from '../event-bus';
import { set } from '../../utils';

export enum StoreEvents {
    Updated = 'updated'
}

export default class Store extends EventBus {

    private static _instance: Store;
    public static STORE_NAME = 'appStore';

    private _state: Indexed = {};

    private constructor() {
        super();

        const savedState = localStorage.getItem(Store.STORE_NAME);

        this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};

        this.on(
            StoreEvents.Updated,
            () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
        );
    }

    public static getInstance(): Store {
        if (!Store._instance) {
            Store._instance = new Store();
        }

        return Store._instance;
    }

    public getState(): Indexed {
        return this._state;
    }

    public removeState(): void {
        this._state = {};
        this.emit(StoreEvents.Updated);
    }

    public set(path: string, value: unknown): Store {
        set(this._state, path, value);
        this.emit(StoreEvents.Updated);
        return this;
    }

}
