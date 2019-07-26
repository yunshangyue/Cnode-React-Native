import { Toast } from '@ant-design/react-native'

const delay = (timeOut = 8000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时'))
        }, timeOut)
    })
}

// fetch
const fetchF = (method, url, params) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method,
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    resolve(res.json())
                } else {
                    Toast.offline('网络出错')
                    reject(new Error('请求出错'))
                }
            })
    })
}

const _fetch = (fetchPromise, timeout) => {
    return Promise.race([fetchPromise, delay(timeout)])
}

// post
const HttpPost = (url, params, timeout = 8000) => {
    return _fetch(fetchF('POST', url, params), timeout)
}

// get
const HttpGet = (url, timeout = 8000) => {
    return _fetch(fetchF('Get', url), timeout)
}

export {HttpPost, HttpGet}
