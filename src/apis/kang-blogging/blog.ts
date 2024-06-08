import { CreateBlogRequest, GetBlogsRequest, UpdateBlogRequest } from "../../interfaces/request/blog_request";
import { CreateBlogResponse, GetBlogByID, GetBlogsResponse, UpdateBlogResponse } from "../../interfaces/response/blog_response";
import axiosClient from "./axios_client";

const ApiBlog = {
    getBlogs: (params: GetBlogsRequest)=>{
        const url = '/api/v1/blog';
        return axiosClient.get<GetBlogsResponse>(url, {params: params})
     },
    getBlogById:(id: string) => {
        const url = `/api/v1/blog/${id}`;
        return axiosClient.get<GetBlogByID>(url)
    },
    createBlog: (params: CreateBlogRequest, access_token: string) =>{
        const url = '/api/v1/create-blog';
        return axiosClient.post<CreateBlogResponse>(url, params, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }, )
    },
    updateBlog: (blog_id: string, access_token: string, params: UpdateBlogRequest) => {
        const url = `/api/v1/blog/${blog_id}`;
        return axiosClient.patch<UpdateBlogResponse>(url, params, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        })
    },
    deleteBlog: (blog_id: string) => {
        const url = `/api/v1/blog/${blog_id}`;
        return axiosClient.delete<UpdateBlogResponse>(url)
    }
}


export default ApiBlog