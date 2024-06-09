import { IPagination } from "../model/pagination";
import { IUser } from "../model/user";
import { IUSerMetadata } from "../model/user_metadata";


export interface GetUsersResponse {
    code: number
    message: string
    data: {
        users: IUSerMetadata[]
        pagination: IPagination
    }
}
export interface GetUserDetailResponse {
    code: number
    message: string
    data: {
        user: IUser
    }
}

export interface UpdateUserResponse {
    code: number
    message: string
    data: {
        user: IUSerMetadata
    }
}

export interface DeleteUserResponse {
    code: number
    message: string
}