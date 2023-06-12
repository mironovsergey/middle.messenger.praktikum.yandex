import type { TBlockClass } from '../block';
import { expect } from 'chai';
import { SinonSpy, spy, fake } from 'sinon';
import { JSDOM } from 'jsdom';
import Router from './router';
import { RoutePaths } from '../../utils/constants';

describe('Router', () => {
    let router: Router;
    let historyPushStateSpy: SinonSpy;
    let historyBackSpy: SinonSpy;
    let historyForwardSpy: SinonSpy;
    let FakeBlockClass: TBlockClass;

    before(() => {
        const { window } = new JSDOM(
            '<!doctype html><html><body><div id="root"></div></body></html>',
            {
                url: 'http://localhost'
            }
        );

        (global as any).window = window;
        (global as any).document = window.document;
    });

    after(() => {
        (global as any).window = undefined;
        (global as any).document = undefined;
    });

    beforeEach(() => {
        router = Router.getInstance('#root');

        historyPushStateSpy = spy(router.history, 'pushState');
        historyBackSpy = spy(router.history, 'back');
        historyForwardSpy = spy(router.history, 'forward');

        FakeBlockClass = class {
            getElement = fake.returns(document.createElement('div'));
            dispatchComponentDidMount = fake();
        } as unknown as TBlockClass;
    });

    afterEach(() => {
        historyPushStateSpy.restore();
        historyBackSpy.restore();
        historyForwardSpy.restore();
    });

    it('должен переходить на указанный маршрут', () => {
        router
            .use(RoutePaths.SignIn, FakeBlockClass, {})
            .use(RoutePaths.SignUp, FakeBlockClass, {})
            .start();

        router.go(RoutePaths.SignUp);

        // Проверка, что метод history.pushState вызывается с правильными аргументами
        expect(historyPushStateSpy.calledWith({}, '', RoutePaths.SignUp)).to.equal(true);
    });

    it('должен переходить на предыдущую страницу', () => {
        router
            .use(RoutePaths.SignIn, FakeBlockClass, {})
            .use(RoutePaths.SignUp, FakeBlockClass, {})
            .start();

        router.go(RoutePaths.SignUp);
        router.back();

        // Проверка, что метод history.back вызывается
        expect(historyBackSpy.called).to.equal(true);
    });

    it('должен переходить на следующую страницу', () => {
        router
            .use(RoutePaths.SignIn, FakeBlockClass, {})
            .use(RoutePaths.SignUp, FakeBlockClass, {})
            .start();

        router.go(RoutePaths.SignUp);
        router.back();
        router.forward();

        // Проверка, что метод history.forward вызывается
        expect(historyForwardSpy.called).to.equal(true);
    });
});
