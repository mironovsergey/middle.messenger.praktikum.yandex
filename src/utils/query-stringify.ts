const queryStringify = (data: Record<string, any>, parentKey?: string): string | never => {
    // Проверяем, что на вход попал объект
    if (typeof data !== 'object') {
        throw new Error('Данные должны быть объектом');
    }

    // Создаем массив для хранения параметров
    const params: string[] = [];

    // Проходим по каждому свойству объекта
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            const newKey = parentKey ? `${parentKey}[${key}]` : key;

            // Если значение является массивом, добавляем каждый элемент массива
            // в отдельный параметр с индексом
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i += 1) {
                    const val = value[i];
                    const indexedKey = `${newKey}[${i}]`;

                    params.push(`${encodeURIComponent(indexedKey)}=${encodeURIComponent(val)}`);
                }
            } else if (typeof value === 'object' && value !== null) {
                // Если значение является объектом, рекурсивно вызываем функцию
                // для обработки вложенных свойств
                const nestedParams = queryStringify(value, newKey);

                if (nestedParams !== '') {
                    params.push(nestedParams);
                }
            } else {
                // Во всех остальных случаях добавляем параметр в виде "ключ=значение"
                params.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(value)}`);
            }
        }
    }

    // Соединяем все параметры в строку и возвращаем результат
    return params.join('&');
};

export default queryStringify;
