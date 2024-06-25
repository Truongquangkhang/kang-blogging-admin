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

export interface CreateCategoryResponse {
    code: number
    message: string
    data: {
        category: ICategory
    }
}

export interface UpdateCategoryResponse {
    code: number
    message: string
    data: {
        category: ICategory
    }
}