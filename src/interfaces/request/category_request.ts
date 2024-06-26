export interface GetCategoriesRequest {
    page: number
    pageSize: number
    searchName?: string | null
    sortBy?: string | null
}

export interface CreateCategoryRequest {
    name: string
    description: string
}

export interface UpdateCategoryRequest {
    name: string
    description: string
}
