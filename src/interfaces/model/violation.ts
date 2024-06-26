import { IUSerMetadata } from "./user_metadata"

export interface IViolation {
    id: string
    type: string
    targetId: string
    description?: string | null
    createdAt: number
    user: IUSerMetadata 
}