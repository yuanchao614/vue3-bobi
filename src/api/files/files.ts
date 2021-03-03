import Axios from "../../utils/http/axios/Axios";
import { SearchFileInterface, Pagination } from './interface'


export function getFileListBySearch(param: SearchFileInterface = {}) {
    return Axios.request({
        url: "/api/files/search",
        method: "post",
        data: param
      })
}

export function getFileById(id: string) {
    return Axios.request({
        url: `/api/files/${id}`,
        method: 'GET'
    })
}

export function download(id: string) {
    return Axios.request({
        url: `/api/files/download/${id}`,
        method: 'GET'
    })
}

export function deleteApi(id: string) {
    return Axios.request({
        url: `/api/files/delete/${id}`,
        method: 'GET'
    })
}

export function uploadApi(formData: any) {
    return Axios.request({
        url: '/api/files',
        method: 'POST',
        data: formData
    })
}

export function queryFileInfo(query: SearchFileInterface, pagination: Pagination) {
    return Axios.request({
        url: `/api/files/query?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`,
        method: "POST",
        data: query
      }) 
}