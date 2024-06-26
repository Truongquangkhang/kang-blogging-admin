import { IPagination } from "../model/pagination"
import { IViolation } from "../model/violation"

export interface GetViolationResponse {
    code: number
    message: string
    data: {
        violations: IViolation[]
        pagination: IPagination
    }
}