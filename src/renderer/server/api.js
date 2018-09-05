import http from './http.js'

/**
 * 登录
 */
export const login = data =>
    http({
        url: `/topics`,
        method: 'get',
        data
    })
