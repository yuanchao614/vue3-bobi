import Axios from "../../utils/http/axios/Axios";


export function getFileListBySearch(param: any = {}) {
    return Axios.request({
        url: "/files/search",
        method: "post",
        data: param
      })
}

export function getFileById(id: string) {
    return Axios.request({
        url: `/files/${id}`,
        method: 'GET',
        params: {
            id: id
        }
    })
}

export function download(id: string) {
    return Axios.request({
        url: `/download/${id}`,
        method: 'GET',
        // params: {
        //     id: id
        // }
    })
}