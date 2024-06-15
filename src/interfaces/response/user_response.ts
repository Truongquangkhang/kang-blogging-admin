import { IBlogMetadata } from "../model/blog_metadata";
import { ICommentMetadata } from "../model/comment";
import { IPagination } from "../model/pagination";
import { IUser } from "../model/user";
import { IUSerMetadata } from "../model/user_metadata";


export interface GetUsersResponse {
    code: number
    message: string
    data: {
        users: IUser[]
        pagination: IPagination
    }
}
export interface GetUserDetailResponse {
    code: number
    message: string
    data: {
        user: IUser
        blogs: IBlogMetadata[]
        comments: ICommentMetadata[]
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