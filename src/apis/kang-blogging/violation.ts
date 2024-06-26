import { GetReportRequest } from './../../interfaces/request/violation_request';
import { GetViolationsRequest } from "../../interfaces/request/violation_request";
import { GetReportsResponse, GetViolationResponse } from "../../interfaces/response/violation_response";
import axiosClient from "./axios_client";

const ApiViolation = {
    getViolations: (params: GetViolationsRequest)=>{
        const url = '/api/v1/violation';
        return axiosClient.get<GetViolationResponse>(url, {params: params})
    },
    getReports: (params: GetReportRequest) => {
        const url = '/api/v1/report';
        return axiosClient.get<GetReportsResponse>(url, {params: params})
    },
    closeReport: (report_id: string) => {
        const url = `/api/v1/report/${report_id}`;
        return axiosClient.delete(url)
    }
}


export default ApiViolation