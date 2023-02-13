export type TChat = {
    name: string;
    image: string;
    time: number;
    text: string;
    count: string;
    active?: boolean;
};

export type TMessage = {
    text?: string;
    image?: string;
    time: number;
    self?: boolean;
};

export type TUser = {
    avatar: string;
    display_name: string;
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
};

export type TField = {
    type: string;
    name: string;
    label: string;
    rules?: string[];
    errors?: string[];
};
