import { ICategory } from "../model/category"
import { IPagination } from "../model/pagination"

export interface GetCategoriesResponse {
    code: number
    message: string
    data: {
        categories: ICategory[]
        pagination: IPagination
    }
}