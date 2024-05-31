import { IBlogMetadata } from "../model/blog_metadata"
import { IComment } from "../model/comment"

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