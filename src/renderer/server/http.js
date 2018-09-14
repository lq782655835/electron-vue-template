import Vue from 'vue'
import axios from 'axios'
import { apiURL } from '@/utils/config'
import { tokenLoc } from '@/utils/locs'

const service = axios.create({
    baseURL: process.env.BASE_URL || apiURL, // api的base_url
    timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            config.headers['Content-Type'] = 'application/json'
            // 序列化
            config.data = JSON.stringify(config.data)
            if (config.type === 'form') {
                config.headers['Content-Type'] = 'multipart/form-data'
            }
        }

        // permission check for token
        let token = tokenLoc.get()
        if (token) {
            config.headers['token'] = token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.success) {
            return res.data // 直接返回数据
        } else {
            return Promise.reject(res)
        }
    },
    error => {
        Vue.prototype.$throw(error) // 错误存储在日志
        return Promise.reject(error)
    }
)

export default service
