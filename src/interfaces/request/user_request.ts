export interface GetUsersRequest {
    page: number
    pageSize: number
    searchBy?: string | null
    searchName?: string | null
}

export interface GetUserDetailRequest {
    
}

export interface UpdateUserRequest {
    name?: string | null
    email?: string | null
    displayName?: string | null
    avatar?: string | null 
    phoneNumber?: string | null
    gender?: boolean | null
    description?: string | null
}