export interface GetViolationsRequest {
    page: number
    pageSize: number
    type?: string | null
    user_ids?: string | null
}

export interface GetReportRequest {
    page: number
    pageSize: number
    type?: string | null
    user_ids?: string | null
    is_closed?: boolean | null
    reason?: string | null
}