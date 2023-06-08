export type Indexed<T = any> = {
    [key in string]: T;
};

export type TChat = {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
    unread_count: number;
    last_message: TLastMessage | null;
};

export type TLastMessage = {
    user: TUser;
    time: string;
    content: string;
};

export type TMessage = {
    id: number;
    content: string;
    time: string;
    type: string;
    user_id: number;
    chat_id?: number;
    is_read?: boolean;
    file?: TFile | null;
};

export type TFile = {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
};

export type TUser = {
    id: number;
    avatar?: string;
    display_name?: string;
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    role?: string;
};

export type TField = {
    type: string;
    name: string;
    label: string;
    value?: string;
    rules?: string[];
    errors?: string[];
};

export type TSignUpRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type TSignUpResponse = {
    id: number;
};

export type TSignInRequest = {
    login: string;
    password: string;
};

export type TProfileRequest = Omit<TUser, 'id' | 'avatar'>;

export type TPasswordRequest = {
    oldPassword: string;
    newPassword: string;
};

export type TGetChatsRequest = {
    offset?: number;
    limit?: number;
    title?: string;
};

export type TPostChatsResponse = {
    id: number;
};

export type TPutUsersRequest = {
    users: number[];
    chatId: number;
};

export type TDeleteUsersRequest = {
    users: number[];
    chatId: number;
};

export type TGetUsersRequest = {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
};

export type TDeleteChatsResponse = {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string | null;
        created_by: null;
    }
};

export type TGetTokenResponse = {
    token: string;
};
