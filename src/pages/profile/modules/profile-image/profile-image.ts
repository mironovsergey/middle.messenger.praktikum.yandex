import type { TBlockProps } from '../../../../services/block';
import UserController from '../../../../controllers/user-controller';
import Block from '../../../../services/block';

import template from './profile-image.hbs';

import './profile-image.scss';

type TProfileImage = {
    avatar: string | null;
    name: string | null;
} & TBlockProps;

export default class ProfileImage extends Block<TProfileImage> {

    constructor(props: TProfileImage) {
        super({
            ...props,
            events: {
                submit: (event: Event) => {
                    event.preventDefault();

                    const target = event.target as HTMLInputElement;
                    const file = target.files?.[0];

                    if (file) {
                        const formData = new FormData();
                        formData.append('avatar', file);
                        UserController.avatar(formData);
                    }
                }
            }
        });
    }

    render() {
        return this.compile(template);
    }

    addEvents() {
        this.getElement().querySelector('input[name="avatar"]')
            ?.addEventListener('change', this._props.events!.submit);
    }

}
