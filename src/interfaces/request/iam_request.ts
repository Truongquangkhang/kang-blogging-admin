export interface ILoginRequest {
    username: string;
    password: string
}

export interface IRegisterRequest {
    name: string
    email: string
    display_name: string
    gender: boolean
    birth_day: number
    phone_numbers: string
    username: string
    password: string
    avatar?: string
}