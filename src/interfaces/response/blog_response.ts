import { IBlog } from "../model/blog_info"
import { IBlogMetadata } from "../model/blog_metadata"
import { IPagination } from "../model/pagination"

export interface GetBlogsResponse {
    code: number
    message: string
    data: {
        blogs: IBlogMetadata[]
        pagination: IPagination
    }
}

export interface GetBlogByID {
    code: number
    message: string
    data: {
        blog: IBlog
    }
}

export interface CreateBlogResponse{
    code: number
    message: string
    data: {
        blog: IBlog
    }
}

export interface UpdateBlogResponse {
    code: number
    message: string
    data: {
        blog: IBlog
    }
}

export interface DeleteBlogResponse {
    code: number
    message: string
}