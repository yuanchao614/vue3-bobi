import Axios from "../../utils/http/axios/Axios";


export interface LoginParam {
    username: string;
    password: string;
}

export function loginApi(data: LoginParam) {
    return Axios.request({
        url: '/api/auth/login',
        method: 'POST',
        data
    })
}