import { IUSerMetadata } from "./user_metadata"

export interface IComment {
    id: string
    content: string
    isToxicity: boolean
    createdAt: number
    updateAt: number
    user: IUSerMetadata
}

export interface ICommentWithReplies {
    comment: IComment
    replies: IComment[]
}

export interface ICommentItem {
    commentInfo: IComment
    blogId: string
    replyCommentId?: string | null
}

export interface ICommentMetadata {
    id: string
    content: string
    isToxicity: boolean
    createdAt: number
    updateAt: number
}