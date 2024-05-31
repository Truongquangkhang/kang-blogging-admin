import { AxiosResponse } from "axios"
import { ICheckExistUserResponse, ILoginResponse } from "../interfaces/response/iam_response"
import { IErrorResponse } from "../interfaces/response/error_response"

export const MapErrorResponse = (response?: AxiosResponse) => {
    const rs: IErrorResponse = {
        code: response?.data.code,
        message: response?.data.message,
    }
    return rs
}

export const MapAxiosReponseToModelLoginReponse = (response: AxiosResponse) =>{
    const rs: ILoginResponse = {
        code: response.data.code,
        message: response.data.message,
        data: {
            accessToken: response.data.data.accessToken,
            refreshToken: response.data.data.refreshToken,
            userInfo: {
                id: response.data.data.userInfo.id,
                name: response.data.data.userInfo.name,
                displayName: response.data.data.userInfo.displayname,
                email: response.data.data.userInfo.email,
                gender: response.data.data.userInfo.gender,
                totalBlogs: response.data.data.userInfo.totalBlogs,
                avatar: response.data.data.userInfo.avatar,
            }
        }
    }
    return rs
}

export const MapAxiosReponseToModelCheckExistuser = (response: AxiosResponse) =>{
    const rs: ICheckExistUserResponse = {
        code: response.data.code,
        message: response.data.message,
        data: {
            alreadyExist: response.data.data.alreadyExist
        }
    }
    return rs
}
