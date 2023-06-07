import type { TBlockProps } from '../../../../services/block';
import Block from '../../../../services/block';
import Button from '../../../../components/button';
import FormControl from '../../../../modules/form/components/form-control';
import MessagesController from '../../../../controllers/messages-controller';

import template from './message.hbs';

import './message.scss';

import iconMessage from 'bundle-text:../../../../../static/images/icons/message.svg';

type TMessage = {
    control: FormControl;
    button: Button;
} & TBlockProps;

export default class Message extends Block<TMessage> {

    constructor(props = {}) {
        super({
            ...props,
            control: new FormControl({
                type: 'text',
                name: 'message',
                label: 'Cообщение'
            }),
            button: new Button({
                type: 'submit',
                mod: 'primary',
                text: iconMessage
            }),
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const target = event.target as HTMLFormElement;
                    const message = target.querySelector('input[name="message"]') as HTMLInputElement;
                    const messageValue = message.value;

                    if (messageValue) {
                        MessagesController.getInstance().sendMessage(messageValue);
                    }

                    target.reset();
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }

    // addEvents() {
    //     this.getElement().querySelector('form')
    //         .addEventListener('submit', this._props.events.submit);
    // }

}
