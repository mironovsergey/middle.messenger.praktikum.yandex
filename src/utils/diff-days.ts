// Возвращает разницу дней
const diffDays = (date1: Date, date2: Date): number => {
    const diff = new Date(+date1).setHours(12) - new Date(+date2).setHours(12);
    return Math.abs(Math.round(diff / 8.64e7));
};

export default diffDays;
