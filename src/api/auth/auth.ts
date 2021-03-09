import Axios from "../../utils/http/axios/Axios";



export function login(data: {
    username: string,
    password: string
}) {
    Axios.request({
        url: '/api/auth/login',
        method: 'POST',
        data
    })
}