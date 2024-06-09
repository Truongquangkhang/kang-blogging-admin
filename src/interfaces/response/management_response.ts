import { IBlogMetadata } from "../model/blog_metadata"
import { IComment } from "../model/comment"
import { IPolicy } from "../model/policy"

export interface GetDashBoardResponse {
    code: number
    message: string
    data: {
        totalBlogs: number
        totalComments: number
        totalUsers: number
        totalCategories: number
        blogsIncreaseInDay: number
        commentsIncreaseInDay: number
        usersIncreaseInDay: number
        latestBlogs: IBlogMetadata[]
        latestComments: IComment[]
    }
}

export interface GetPoliciesResponse {
    code: number
    message: string
    data: {
        policies: IPolicy[]
    }
}

export interface UpdatePoliciesResponse {
    code: number
    message: string
}