import {
    SinonFakeXMLHttpRequest,
    SinonFakeXMLHttpRequestStatic,
    useFakeXMLHttpRequest,
    stub
} from 'sinon';

import { expect } from 'chai';
import HTTPTransport, { METHODS, TMethod } from './http-transport';
import { queryStringify } from '../utils';

describe('HTTPTransport', () => {
    const originalXHR = global.XMLHttpRequest;
    let xhr: SinonFakeXMLHttpRequestStatic;
    let requests: SinonFakeXMLHttpRequest[];

    beforeEach(() => {
        requests = [];

        xhr = useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };
    });

    afterEach(() => {
        xhr.restore();
    });

    after(() => {
        global.XMLHttpRequest = originalXHR;
    });

    function testHTTPMethod<T extends keyof typeof HTTPTransport>(
        methodName: T,
        expectedMethod: METHODS
    ) {
        return async () => {
            const url = '/api';
            const data = { title: 'Test' };
            const options = { headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(data) };

            (HTTPTransport[methodName] as TMethod)(url, options);

            const [request] = requests;

            expect(requests.length).to.equal(1);
            expect(request.url).to.equal(url);
            expect(request.method).to.equal(expectedMethod);
            expect(request.requestHeaders['Content-Type']).to.include('application/json');
            expect(request.requestBody).to.equal(JSON.stringify(data));
        };
    }

    describe('get', () => {
        it('должен отправлять GET-запрос с правильными параметрами', async () => {
            const url = '/api';
            const data = { title: 'Test' };
            const options = { data };

            HTTPTransport.get(url, options);

            const [request] = requests;

            expect(requests.length).to.equal(1);
            expect(request.url).to.equal(`${url}?${queryStringify(data)}`);
            expect(request.method).to.equal(METHODS.GET);
        });
    });

    describe('put', () => {
        it('должен отправлять PUT-запрос с правильными параметрами', testHTTPMethod('put', METHODS.PUT));
    });

    describe('post', () => {
        it('должен отправлять POST-запрос с правильными параметрами', testHTTPMethod('post', METHODS.POST));
    });

    describe('delete', () => {
        it('должен отправлять DELETE-запрос с правильными параметрами', testHTTPMethod('delete', METHODS.DELETE));
    });

    describe('request', () => {
        it('должен отклонять запрос при ошибке HTTP', async () => {
            const url = '/api';
            const options = { method: METHODS.GET };
            const rejectStub = stub(HTTPTransport, 'request').rejects(new Error('Ошибка HTTP 404'));

            try {
                await HTTPTransport.request(url, options);
            } catch (error) {
                expect(error.message).to.equal('Ошибка HTTP 404');
                expect(rejectStub.calledOnceWithExactly(url, options)).to.equal(true);
            } finally {
                rejectStub.restore();
            }
        });
    });
});
