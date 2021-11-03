import axios from './api'

export const requestIndex = () => {
    return axios.get('api/index').then((res) => {
        // return res.data
        console.log(res)
    })
}
