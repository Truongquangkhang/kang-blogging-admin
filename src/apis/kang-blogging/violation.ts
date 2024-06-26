import { GetViolationsRequest } from "../../interfaces/request/violation_request";
import { GetViolationResponse } from "../../interfaces/response/violation_response";
import axiosClient from "./axios_client";

const ApiViolation = {
    getViolations: (params: GetViolationsRequest)=>{
        const url = '/api/v1/violation';
        return axiosClient.get<GetViolationResponse>(url, {params: params})
    },
}


export default ApiViolation