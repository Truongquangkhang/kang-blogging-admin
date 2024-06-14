import { UpdatePoliciesRequest } from "../../interfaces/request/management_request";
import { GetDashBoardResponse, GetPoliciesResponse, UpdatePoliciesResponse } from "../../interfaces/response/management_response";
import axiosClient from "./axios_client";

const ApiManagement = {
    getDashboard: ()=>{
        const url= `/api/v1/management/dashboard`;
        return axiosClient.get<GetDashBoardResponse>(url)
    }  ,
    getPolicy: ()=>{
        const url= `/api/v1/management/policy`;
        return axiosClient.get<GetPoliciesResponse>(url)
    },
    updatePolicies: (params: UpdatePoliciesRequest)=>{
        const url= `/api/v1/management/policy`;
        return axiosClient.patch<UpdatePoliciesResponse>(url, params)
    }
}

export default ApiManagement