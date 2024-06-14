import { AxiosResponse } from "axios"
import { IErrorResponse } from "../interfaces/response/error_response"

export const MapErrorResponse = (response?: AxiosResponse) => {
    const rs: IErrorResponse = {
        code: response?.data.code,
        message: response?.data.message ?? "Occurred an error",
    }
    return rs
}