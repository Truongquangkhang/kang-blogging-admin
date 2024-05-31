import { UploadImageResponse } from "../../interfaces/response/image_response";
import axiosClient from "./axios_client";

const ApiImage = {
    uploadImage: (formData: any)=>{
        const url = '/api/v1/image/upload';
        return axiosClient.post<UploadImageResponse>(url, formData, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            }
        })
     },
}


export default ApiImage