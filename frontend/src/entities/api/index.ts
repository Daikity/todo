import axios, { type AxiosStatic } from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
}) as AxiosStatic