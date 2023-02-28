// Склонение существительных после числительных
const declension = (value: number, words: string): string => {
    const items = words.split(',');
    const array = [2, 0, 1, 1, 1, 2];

    const index = (value % 100 > 4 && value % 100 < 20)
        ? 2
        : array[(value % 10 < 5) ? value % 10 : 5];

    return items[index];
};

export default declension;
