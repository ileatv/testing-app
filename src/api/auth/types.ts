export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IPerson {
    id?: number;
    role: string;
    username: string;
    password: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    courseId: string;
}