import type { TUser, TProfileRequest } from '../../utils/types';
import { IHTMLFormElementWithValidator } from '../../services/validator';
import UserController from '../../controllers/user-controller';
import EditProfile from './edit-profile';
import Form from '../../modules/form';
import { requireAuth } from '../../services/auth';
import { connect } from '../../services/store';
import { getFormData } from '../../utils';

const withUser = connect(({ user }: { user?: TUser }) => {
    if (!user) {
        return {};
    }

    return {
        body: new Form({
            fields: [
                {
                    type: 'text',
                    name: 'display_name',
                    label: 'Имя в чате',
                    value: user.display_name,
                    rules: ['required', 'name']
                },
                {
                    type: 'text',
                    name: 'login',
                    label: 'Логин',
                    value: user.login,
                    rules: ['required', 'login']
                },
                {
                    type: 'text',
                    name: 'first_name',
                    label: 'Имя',
                    value: user.first_name,
                    rules: ['required', 'name']
                },
                {
                    type: 'text',
                    name: 'second_name',
                    label: 'Фамилия',
                    value: user.second_name,
                    rules: ['required', 'name']
                },
                {
                    type: 'email',
                    name: 'email',
                    label: 'Почта',
                    value: user.email,
                    rules: ['required', 'email']
                },
                {
                    type: 'tel',
                    name: 'phone',
                    label: 'Телефон',
                    value: user.phone,
                    rules: ['required', 'phone']
                }
            ],
            button: {
                type: 'submit',
                mod: 'primary',
                text: 'Сохранить'
            },
            events: {
                submit: (event: SubmitEvent) => {
                    event.preventDefault();

                    const target = event.target as IHTMLFormElementWithValidator;

                    if (typeof target.isValid === 'function' && target.isValid()) {
                        const formData = getFormData(target as HTMLFormElement);

                        UserController.profile(formData as TProfileRequest);
                    }
                }
            }
        })
    };
});

export default withUser(requireAuth(EditProfile));
