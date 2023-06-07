import type { TProfileRequest, TPasswordRequest } from '../utils/types';
import UserAPI from '../api/user-api';
import Store from '../services/store';

export default class UserController {

    // Изменение данных текущего пользователя
    public static async profile(data: TProfileRequest) {
        try {
            const response = await UserAPI.profile(data);
            Store.getInstance().set('user', response);
        } catch (error) {
            alert(error.message);
        }
    }

    public static async password(data: TPasswordRequest) {
        try {
            const response = await UserAPI.password(data);
            alert(response);
        } catch (error) {
            alert(error.message);
        }
    }

    public static async avatar(data: FormData) {
        try {
            const response = await UserAPI.avatar(data);
            Store.getInstance().set('user', response);
        } catch (error) {
            alert(error.message);
        }
    }

}
