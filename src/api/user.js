import { http } from '@/utils/http'


export const getUser = data => {
    return http({
        url: '/bl/user/query',
        method: 'get',
    })
}
export const addUser = data => {
    return http({
        url: '/bl/user/add',
        method: 'post',
        data
    })
}
export const editUser = (data) => {
    return http({
        url: `/bl/user/edit/${data.id}`,
        method: 'post',
        data
    })
}
export const deleteUser = (data) => {
    return http({
        url: `/bl/user/delete/${data}`,
        method: 'post',
    })
}

