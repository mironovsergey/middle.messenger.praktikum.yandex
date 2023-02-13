// Возвращает дату следующего формата: день месяц год
export const formatDate = (time: number): string => {
    const date = new Date(time);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Возвращает разницу дней
export const diffDays = (date1: Date, date2: Date): number => {
    const diff = new Date(+date1).setHours(12) - new Date(+date2).setHours(12);
    return Math.abs(Math.round(diff / 8.64e7));
};

// Склонение существительных после числительных
export const declension = (value: number, words: string): string => {
    const items = words.split(',');
    const array = [2, 0, 1, 1, 1, 2];

    const index = (value % 100 > 4 && value % 100 < 20)
        ? 2
        : array[(value % 10 < 5) ? value % 10 : 5];

    return items[index];
};

// Возвращает данные формы в виде объекта
export const getFormData = (form: HTMLFormElement): { [key: string]: string } => {
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value.toString();
    }

    return data;
};

// Рекурсивная функция глубокого сравнения двух объектов
export const deepCompare = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) {
        return true;
    }

    if (
        typeof obj1 !== 'object'
        || typeof obj2 !== 'object'
        || obj1 === null
        || obj2 === null
    ) {
        return false;
    }

    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (const key of obj1Keys) {
        if (!obj2Keys.includes(key)) {
            return false;
        }

        if (!deepCompare(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
};

// Возвращает объект, содержащий указанные свойства
export const pickProps = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    return keys.reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {} as Pick<T, K>);
};
