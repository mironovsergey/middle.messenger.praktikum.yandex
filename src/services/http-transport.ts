import type { Indexed } from '../utils/types';
import { queryStringify } from '../utils';

enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

type TOptions = {
    headers?: Indexed<string>;
    data?: Indexed | XMLHttpRequestBodyInit;
    method?: METHODS;
    timeout?: number;
};

type TMethod = (url: string, options?: TOptions) => Promise<XMLHttpRequest>;

export default class HTTPTransport {

    public static get: TMethod = (url, options = {}) => (
        HTTPTransport.request(url, { ...options, method: METHODS.GET }, options.timeout)
    );

    public static put: TMethod = (url, options = {}) => (
        HTTPTransport.request(url, { ...options, method: METHODS.PUT }, options.timeout)
    );

    public static post: TMethod = (url, options = {}) => (
        HTTPTransport.request(url, { ...options, method: METHODS.POST }, options.timeout)
    );

    public static delete: TMethod = (url, options = {}) => (
        HTTPTransport.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
    );

    public static request = (
        url: string,
        options: TOptions,
        timeout: number = 5000
    ): Promise<XMLHttpRequest> => {
        const { headers = {}, data, method } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('Error method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                (isGet && !!data)
                    ? `${url}?${queryStringify(data as Indexed)}`
                    : url
            );

            // Установить куки
            xhr.withCredentials = true;

            // Таймаут
            xhr.timeout = timeout;

            // Заголовки
            for (const [key, value] of Object.entries(headers)) {
                xhr.setRequestHeader(key, value);
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    };

    public static checkResponse = <T>(response: XMLHttpRequest): Promise<T> => {
        return new Promise((resolve, reject) => {
            if (response.status === 200) {
                try {
                    const responseData = JSON.parse(response.responseText) as T;
                    resolve(responseData);
                } catch (error) {
                    reject(new Error(`Некорректный ответ сервера: ${error.message}`));
                }
            } else {
                reject(new Error(`Ошибка HTTP ${response.status}`));
            }
        });
    };

}
