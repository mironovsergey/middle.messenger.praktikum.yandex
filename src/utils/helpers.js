// Возвращает дату следующего формата: день месяц год
export const formatDate = (time) => {
    const date = new Date(time);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// Возвращает разницу дней
export const diffDays = (date1, date2) => {
    const diff = new Date(+date1).setHours(12) - new Date(+date2).setHours(12);
    return Math.abs(Math.round(diff / 8.64e7));
}

// Склонение существительных после числительных
export const declension = (value, words) => {
    const items = words.split(',');
    const array = [2, 0, 1, 1, 1, 2];

    const index = (value % 100 > 4 && value % 100 < 20)
        ? 2
        : array[(value % 10 < 5) ? value % 10 : 5];

    return items[index];
};
