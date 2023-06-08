import type { Indexed } from './types';

const isEqual = (lhs: Indexed, rhs: Indexed): boolean => {
    // Если оба объекта ссылаются на один и тот же адрес в памяти,
    // то они эквивалентны
    if (lhs === rhs) {
        return true;
    }

    // Если один из объектов - null или не является объектом,
    // то они не эквивалентны
    if (
        lhs === null
        || rhs === null
        || typeof lhs !== 'object'
        || typeof rhs !== 'object'
    ) {
        return false;
    }

    // Сравниваем количество свойств в объектах
    const keys1 = Object.keys(lhs);
    const keys2 = Object.keys(rhs);

    if (keys1.length !== keys2.length) {
        return false;
    }

    // Рекурсивно сравниваем каждое свойство
    for (const key of keys1) {
        if (!keys2.includes(key) || !isEqual(lhs[key], rhs[key])) {
            return false;
        }
    }

    return true;
};

export default isEqual;
