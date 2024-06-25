export interface GetBlogCommentsRequest {
    page: number
    pageSize: number
    blog_id: string
}

export interface CreateBlogCommentRequest {
    content: string
    reply_comment_id?: string | null
}

export interface GetCommentsByParamRequest {
    page: number
    pageSize: number
    searchName?: string | null
    sortBy?: string | null
    isToxicity?: boolean | null
    userIDs?: string | null
    isDeprecated?: boolean | null
}

export interface UpdateCommentRequest {
    content: string
}

export interface DeleteCommentReqeust {
    
}

export interface GetCommentRequest {
}

export interface SetCommentAsToxicRequest {
    content: string
    toxic_indexes: number[]
}