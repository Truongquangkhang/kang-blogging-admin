import { CreateCategoryRequest, GetCategoriesRequest, UpdateCategoryRequest } from "../../interfaces/request/category_request";
import { CreateCategoryResponse, GetCategoriesResponse, UpdateCategoryResponse } from "../../interfaces/response/category_response";
import axiosClient from "./axios_client";

const ApiCategory = {
    getCategories: (params: GetCategoriesRequest)=>{
        const url = '/api/v1/category';
        return axiosClient.get<GetCategoriesResponse>(url, {params: params})
     },
    createCategory: (params: CreateCategoryRequest) => {
        const url = '/api/v1/category';
        return axiosClient.post<CreateCategoryResponse>(url, params)
    },
    editCategory: (categoryId: string, params: UpdateCategoryRequest) => {
        const url = `/api/v1/category/${categoryId}`;
        return axiosClient.patch<UpdateCategoryResponse>(url, params)
    }
}


export default ApiCategory