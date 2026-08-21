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
