import type { TBlockClass } from '../block';
import type { TRouteProps } from './route';
import Route from './route';

export default class Router {

    private static _instance: Router;

    private _rootQuery: string;
    private _currentRoute: Route | null;
    private _routes: Route[];

    get history() {
        return window.history;
    }

    private constructor(rootQuery: string) {
        this._rootQuery = rootQuery;
        this._currentRoute = null;
        this._routes = [];
    }

    public static getInstance(rootQuery: string): Router {
        if (!Router._instance) {
            Router._instance = new Router(rootQuery);
        }

        return Router._instance;
    }

    public use<TProps extends TRouteProps = {}>(
        pathname: string,
        blockClass: TBlockClass<TProps>,
        props: TProps
    ): Router {
        const route = new Route(pathname, blockClass, { ...props, rootQuery: this._rootQuery });

        this._routes.push(route);

        return this;
    }

    public start(): void {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            const { pathname } = target.location;

            this._onRoute(pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _getRoute(pathname: string): Route | undefined {
        return this._routes.find((route) => route.match(pathname));
    }

    private _onRoute(pathname: string): void {
        const route = this._getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();
    }

    public go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }

}
