import Axios from "../../utils/http/axios/Axios";
import { Pagination } from '../files/interface'
import { CreateUser } from './interface'

export function getUser(data: Pagination) {
    const url = data.pageIndex ? `/api/user/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}` : `/api/user`
    return Axios.request({
        url: url,
        method: 'GET'
    })
}

export function createUserApi(data: CreateUser) {
    return Axios.request({
        url: '/api/user',
        method: 'POST',
        data
    })
}

export function updateUserApi(id: string, data: CreateUser) {
    return Axios.request({
        url: `/api/user/${id}`,
        method: 'PUT',
        data
    })
}

export function deleteUserApi(id: string) {
    return Axios.request({
        url: `/api/user/${id}`,
        method: 'delete'
    })
}