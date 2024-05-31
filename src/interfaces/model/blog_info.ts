import { IBlogMetadata } from "./blog_metadata"

export interface IBlog {
    blogInfo: IBlogMetadata
    content: string
}
