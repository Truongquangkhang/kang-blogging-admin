export interface IUSerMetadata {
    id: string
    name: string
    displayName: string
    totalBlogs: number
    avatar?: string
    description?: string | null
    totalComments?: number | 0
}