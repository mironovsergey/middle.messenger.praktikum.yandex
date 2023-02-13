enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

type TOptions = {
    headers?: Record<string, string>;
    data?: XMLHttpRequestBodyInit;
    method?: METHODS;
    timeout?: number;
};

function queryStringify(data: XMLHttpRequestBodyInit): string {
    if (typeof data !== 'object') {
        throw new Error('Error data');
    }

    return Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}

class HTTPTransport {
    get = (url: string, options: TOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    put = (url: string, options: TOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url: string, options: TOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    delete = (url: string, options: TOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: TOptions, timeout: number = 5000): Promise<XMLHttpRequest> => {
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
                    ? `${url}?${queryStringify(data)}`
                    : url
            );

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
                xhr.send(data);
            }
        });
    };
}
