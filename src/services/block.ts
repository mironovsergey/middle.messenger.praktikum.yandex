import { v4 as uuidv4 } from 'uuid';
import EventBus from './event-bus';

export type TBlockProps = {
    events?: { [key: string]: (event: Event) => void };
};

export type TBlockClass<TProps extends TBlockProps = {}> = (
    new (props?: TProps) => Block<TProps>
);

type TChilds = Record<string, Block | Array<Block>>;

export default class Block<TProps extends TBlockProps = {}> {

    static EVENTS: Record<string, string> = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    _props: TProps;
    _childs: TChilds;
    _id: string;
    _element: HTMLElement;
    _eventBus: EventBus;
    _setUpdate: boolean = false;

    constructor(childsAndProps: TProps) {
        const { childs, props } = this.getChildsAndProps(childsAndProps);

        this._id = uuidv4();
        this._eventBus = new EventBus();
        this._childs = this.makePropsProxy(childs);
        this._props = this.makePropsProxy({ ...props, _id: this._id });

        this.registerEvents();
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    registerEvents() {
        this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName);

        element.setAttribute('data-id', this._id);

        return element;
    }

    _render() {
        const element = this.render().firstElementChild as HTMLElement;

        this.removeEvents();

        this._element?.replaceWith(element);
        this._element = element;

        this.addEvents();
    }

    render(): DocumentFragment {
        return document.createDocumentFragment();
    }

    addEvents() {
        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    removeEvents() {
        if (!this._element) {
            return;
        }

        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    getChildsAndProps(childsAndProps: TProps) {
        const childs: TChilds = {};
        const props: Record<string, any> = {};

        Object.entries(childsAndProps).forEach(([key, value]) => {
            if (
                value instanceof Block
                || (Array.isArray(value) && value.every((item) => item instanceof Block))
            ) {
                childs[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { childs, props };
    }

    compile(template: (context: any, options?: any) => string, props?: TProps): DocumentFragment {
        if (typeof props === 'undefined') {
            props = this._props as TProps;
        }

        const propsAndStubs: Record<string, any> = { ...props };

        Object.entries(this._childs).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = child.map((item: Block) => (
                    `<div data-id="${item._id}"></div>`
                ));
            } else {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            }
        });

        const fragment = this.createDocumentElement('template') as HTMLTemplateElement;

        fragment.innerHTML = template(propsAndStubs);

        Object.values(this._childs).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((item: Block) => {
                    const stub = fragment.content.querySelector(`[data-id="${item._id}"]`);
                    const element = item.getElement();

                    if (stub && element instanceof HTMLElement) {
                        stub.replaceWith(element);
                    }
                });
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                const element = child.getElement();

                if (stub && element instanceof HTMLElement) {
                    stub.replaceWith(element);
                }
            }
        });

        return fragment.content;
    }

    _componentDidMount() {
        this.componentDidMount();

        Object.values(this._childs).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach((item: Block) => {
                    item.dispatchComponentDidMount();
                });
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    componentDidMount() { }

    dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);

        if (Object.keys(this._childs).length) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    _componentDidUpdate(oldProps: TProps, newProps: TProps) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);

        if (isReRender) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps) {
        return true;
    }

    setProps(newProps: TProps) {
        if (!newProps) {
            return;
        }

        this._setUpdate = false;

        const oldValue = { ...this._props };

        const { childs, props } = this.getChildsAndProps(newProps);

        if (Object.values(childs).length) {
            Object.assign(this._childs, childs);
        }

        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }

        if (this._setUpdate) {
            this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
            this._setUpdate = false;
        }
    }

    makePropsProxy(props: any): any {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];

                return (typeof value === 'function')
                    ? value.bind(target)
                    : value;
            },

            set: (target, prop, value) => {
                if (target[prop] !== value) {
                    target[prop] = value;
                    this._setUpdate = true;
                }

                return true;
            }
        });
    }

    getElement(): HTMLElement {
        return this._element;
    }

}
