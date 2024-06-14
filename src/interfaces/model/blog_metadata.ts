import { ICategory } from "./category"
import { IUSerMetadata } from "./user_metadata"

export interface IBlogMetadata {
    id: string
    name: string
    description: string
    categories: ICategory[]
    thumbnail: string
    createdAt: number
    author: IUSerMetadata
    totalBlogComments: number
    updatedAt: number
    published: boolean
    isDeprecated: boolean
}
