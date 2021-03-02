import Axios from "../../utils/http/axios/Axios";
import { SearchFileInterface} from './interface'


export function getFileListBySearch(param: SearchFileInterface = {}) {
    return Axios.request({
        url: "/files/search",
        method: "post",
        data: param
      })
}

export function getFileById(id: string) {
    return Axios.request({
        url: `/files/${id}`,
        method: 'GET'
    })
}

export function download(id: string) {
    return Axios.request({
        url: `/files/download/${id}`,
        method: 'GET'
    })
}

export function deleteApi(id: string) {
    return Axios.request({
        url: `/files/delete/${id}`,
        method: 'GET'
    })
}

export function uploadApi(formData: any) {
    return Axios.request({
        url: '/files',
        method: 'POST',
        data: formData
    })
}