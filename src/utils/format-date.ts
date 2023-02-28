// Возвращает дату следующего формата: день месяц год
const formatDate = (time: number): string => {
    const date = new Date(time);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default formatDate;
