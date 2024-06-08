export interface GetBlogsRequest {
    page: number
    pageSize: number
    searchBy?: string | null
    searchName?: string | null
    authorIds?: string
    categoryIds?: string
    sortBy?: string | null
    is_deprecated?: boolean | true
}

export interface CreateBlogRequest {
    name: string,
    description: string
    category_ids: string[]
    thumbnail?: string | null
    content?: string | null
}

export interface UpdateBlogRequest {
    name?: string | null
    thumbnail?: string | null
    content?: string | null
    categoryIds?: string[] | null
}

export interface DeleteBlogRequest {}
