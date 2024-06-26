export interface GetViolationsRequest {
    page: number
    pageSize: number
    type?: string | null
    user_ids?: string | null
}