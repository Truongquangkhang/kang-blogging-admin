import { IBlogMetadata } from './blog_metadata';
import { IUSerMetadata } from "./user_metadata";

export interface IUser {
    userInfo: IUSerMetadata;
    email: string
    gender: boolean
    createdAt: number
    dateOfBirth?: number | null
    blogs: IBlogMetadata[];
} 