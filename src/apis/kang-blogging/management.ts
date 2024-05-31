import { GetDashBoardResponse } from "../../interfaces/response/management_response";
import axiosClient from "./axios_client";

const ApiManagement = {
    getDashboard: ()=>{
        const url= `/api/v1/management/dashboard`;
        return axiosClient.get<GetDashBoardResponse>(url)
    }  ,
}

export default ApiManagement