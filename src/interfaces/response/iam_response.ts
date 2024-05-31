import { IUSerMetadata } from "../model/user_metadata"

export interface ILoginResponse {
    code: number
    message: string
    data: {
        accessToken: string
        refreshToken: string
        userInfo: IUSerMetadata
    }
} 

export interface ICheckExistUserResponse {
    code: number
    message: string
    data: {
        alreadyExist: boolean
    }
}