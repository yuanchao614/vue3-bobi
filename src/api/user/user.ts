import Axios from "../../utils/http/axios/Axios";
import { Pagination } from '../files/interface'

export function getUser(data: Pagination) {
    const url = data.pageIndex ? `/api/user/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}` : `/api/user`
    return Axios.request({
        url: url,
        method: 'GET'
    })
}