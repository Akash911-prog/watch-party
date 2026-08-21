export interface PostUser {
    username: string;
    password: string;
}

export interface DeleteUser {
    username: string;
}

export interface UserPayload {
    username: string;
    id: string;
}

export interface User {
    id: string;
    username: string;
    createdAt: Date;
}
