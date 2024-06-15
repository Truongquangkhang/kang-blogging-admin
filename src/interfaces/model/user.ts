import { IUSerMetadata } from "./user_metadata";

export interface IUser {
    userInfo: IUSerMetadata;
    email: string
    gender: boolean
    createdAt: number
    dateOfBirth?: number | null
    totalBlogs: number
    totalComments: number
    totalFollowers: number
    totalFolloweds: number
    totalViolations: number
    isFollowed: boolean
    isFollower: boolean
} 