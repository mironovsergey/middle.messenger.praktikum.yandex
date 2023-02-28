import type { TBlockProps, TBlockClass } from '../block';
import Block from '../block';
import renderDOM from './render';

export type TRouteProps = TBlockProps & {
    rootQuery?: string;
};

export default class Route<TProps extends TRouteProps = {}> {

    private _pathname: string;
    private _blockClass: TBlockClass<TProps>;
    private _block: Block<TProps> | null;
    private _props: TProps;

    constructor(pathname: string, blockClass: TBlockClass<TProps>, props: TProps) {
        this._pathname = pathname;
        this._blockClass = blockClass;
        this._block = null;
        this._props = props;
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.render();
        }
    }

    public leave(): void {
        if (this._block) {
            this._block = null;
        }
    }

    public match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    public render(): void {
        if (!this._block) {
            this._block = new this._blockClass(this._props);

            if (this._props.rootQuery) {
                renderDOM(this._props.rootQuery, this._block);
            }
        }
    }

}
