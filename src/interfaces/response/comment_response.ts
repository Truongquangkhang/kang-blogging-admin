import { IComment, ICommentItem, ICommentWithReplies } from "../model/comment"
import { IPagination } from "../model/pagination"

export interface GetBlogCommentsResponse {
    code: number
    message: string
    data: {
        comments: ICommentWithReplies[]
        pagination: IPagination
    }
}

export interface CreateBlogCommentResponse {
    code: number
    message: string
    data: {
        comment: IComment
    }
}

export interface GetCommentsByParamResponse {
    code: number
    message: string
    data: {
        comments: ICommentItem[]
        pagination: IPagination
    }
}

export interface UpdateCommentResponse {
    code: number
    message: string
    data: {
        comment: IComment
    }
}

export interface DeleteCommentResponse {
    code: number
    message: string
}

export interface GetCommentResponse {
    code: number
    message: string
    data: {
        comment: IComment
        content_processed?: string | null
        predictions: number[]
    }
}

export interface SetCommentAsToxicResponse {
    code: number
    message: string
}
