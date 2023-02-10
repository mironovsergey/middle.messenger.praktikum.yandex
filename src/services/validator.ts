import EventBus from './event-bus';
import Block from './block';
import { pickProps } from '../utils/helpers';

interface IValidatorHTMLFormElement extends HTMLFormElement {
    isValid?: Function;
}

export default class Validator {

    static EVENTS: Record<string, string> = {
        focus: 'focus',
        blur: 'blur',
        submit: 'submit'
    };

    form: Block;

    fieldList: Array<Block> = [];

    eventBus: EventBus;

    errors: Record<string, string[]> = {};

    constructor(form: Block) {
        this.form = form;

        const element: IValidatorHTMLFormElement = this.form.getElement() as HTMLFormElement;

        element.isValid = this.isValid;

        const { fieldList } = form._childs;

        if (Array.isArray(fieldList)) {
            this.fieldList = fieldList;
        }

        this.eventBus = new EventBus();

        this.registerEvents();
        this.addEvents();
    }

    registerEvents() {
        this.eventBus.on('focus', (field: Block) => {
            this.validate(field);
        });

        this.eventBus.on('blur', (field: Block) => {
            this.validate(field);
        });

        this.eventBus.on('submit', () => {
            Array.from(this.fieldList).forEach((field: Block) => {
                if (field instanceof Block) {
                    this.validate(field);
                }
            });
        });
    }

    addEvents() {
        this.form.getElement().addEventListener('submit', this.handleSubmit);

        Array.from(this.fieldList).forEach((field: Block) => {
            if (field instanceof Block) {
                const element = field.getElement().querySelector('input');

                element?.addEventListener('focus', this.handleInput);
                element?.addEventListener('blur', this.handleInput);
            }
        });
    }

    removeEvents() {
        this.form.getElement().removeEventListener('submit', this.handleSubmit);

        Array.from(this.fieldList).forEach((field: Block) => {
            if (field instanceof Block) {
                const element = field.getElement().querySelector('input');

                element?.removeEventListener('focus', this.handleInput);
                element?.removeEventListener('blur', this.handleInput);
            }
        });
    }

    handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        this.eventBus.emit('submit', this.form);
    };

    handleInput = (event: Event) => {
        const field = this.fieldList.find((item) => (
            item.getElement().querySelector('input') === event.target
        ));

        if (field instanceof Block) {
            const input = field.getElement().querySelector('input');

            if (event.type === 'focus' && !input?.value) {
                return;
            }

            this.eventBus.emit(event.type, field);
        }
    };

    validate(field: Block) {
        const { rules } = field._props as { rules?: [] };

        if (Array.isArray(rules)) {
            const methods = pickProps(this.methods, rules);
            const input = field.getElement().querySelector('input');

            const errors = Object.entries(methods).reduce((acc, [key, method]) => {
                return typeof method === 'function' && !method(input?.value)
                    ? [...acc, key] : acc;
            }, []);

            if (input?.name) {
                this.errors[input.name] = errors;
                this.toggleErrors(field, input.name);
            }
        }
    }

    toggleErrors(field: Block, inputName: string) {
        const errors = this.errors[inputName] as [] | undefined;

        if (typeof errors !== 'undefined') {
            field.setProps({
                errors: errors.length !== 0
                    ? pickProps(this.messages, errors) : null
            });
        }
    }

    isValid = (): boolean => {
        this.eventBus.emit('submit', this.form);

        for (const prop in this.errors) {
            if (Array.isArray(this.errors[prop]) && this.errors[prop].length > 0) {
                return false;
            }
        }

        return true;
    };

    messages = {
        required: 'Это поле необходимо заполнить',
        name: 'Введите корректное значение',
        login: 'Введите корректный логин',
        password: 'Введите корректный пароль',
        phone: 'Введите корректный телефон',
        email: 'Введите корректный E-mail'
    };

    methods = {
        required: (value: string): boolean => {
            return value !== undefined && value !== null && value.length !== 0;
        },

        name: (value: string): boolean => {
            // Регулярное выражение ищет строку, которая начинается с заглавной
            // латинской или кириллической буквы, а затем следует 0 или более
            // букв (латинских или кириллических) или дефиса
            return /^[A-ZА-Я][A-Za-zА-я-]*$/.test(value);
        },

        login: (value: string): boolean => {
            // Регулярное выражение ищет строку, которая состоит из 3 до 20
            // латинских букв, цифр или дефиса или нижнего подчеркивания,
            // и не может состоять только из цифр
            return /^(?!\d+$)[A-Za-z\d\-_]{3,20}$/.test(value);
        },

        password: (value: string): boolean => {
            // Регулярное выражение ищет строку, которая состоит от 8 до 40
            // латинских букв верхнего и нижнего регистра или цифр,
            // и обязательно содержит хотя бы одну заглавную букву и цифру
            return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value);
        },

        phone: (value: string): boolean => {
            // Регулярное выражение ищет строку, которая состоит от 10 до 15
            // цифр и может начинаться с знака плюса
            return /^\+?\d{10,15}$/.test(value);
        },

        email: (value: string): boolean => {
            // Регулярное выражение ищет строки, которые соответствуют
            // формату email адреса: имя пользователя, содержащее буквы, цифры,
            // точки, знаки процента, плюса, минуса или нижнего подчеркивания,
            // символ @, доменное имя, содержащее буквы, цифры, точки или
            // минусы, и доменный суффикс с двумя или более буквами
            return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(value);
        }
    };

}
