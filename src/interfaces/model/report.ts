import { IUSerMetadata } from "./user_metadata"

export interface IReport {
    id: string,
    type: string,
    targetId: string,
    description?: string | null
    createdAt: number
    isClosed: boolean
    user: IUSerMetadata
    reason: string
}
