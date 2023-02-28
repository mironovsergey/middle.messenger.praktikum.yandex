// Возвращает данные формы в виде объекта
const getFormData = (form: HTMLFormElement): { [key: string]: string } => {
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};

    for (const [key, value] of formData.entries()) {
        data[key] = value.toString();
    }

    return data;
};

export default getFormData;
