import { CreateCategoryRequest, GetCategoriesRequest } from "../../interfaces/request/category_request";
import { CreateCategoryResponse, GetCategoriesResponse } from "../../interfaces/response/category_response";
import axiosClient from "./axios_client";

const ApiCategory = {
    getCategories: (params: GetCategoriesRequest)=>{
        const url = '/api/v1/category';
        return axiosClient.get<GetCategoriesResponse>(url, {params: params})
     },

    careateCategory: (params: CreateCategoryRequest) => {
        const url = '/api/v1/category';
        return axiosClient.post<CreateCategoryResponse>(url, params)
    }
}


export default ApiCategory