import type { Indexed } from './types';

type NestedObject = {
    [key: string]: any;
};

const set = (
    object: Indexed | unknown,
    path: string,
    value: unknown
): Indexed | unknown => {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw Error('Значение path должно быть строкой');
    }

    const keys = path.split('.');
    const lastKeyIndex = keys.length - 1;

    keys.reduce((nestedObject: NestedObject, key, index) => {
        if (index === lastKeyIndex) {
            nestedObject[key] = value;
        } else {
            nestedObject[key] = nestedObject[key] || {};
            return nestedObject[key];
        }
        return nestedObject;
    }, object);

    return object;
};

export default set;
