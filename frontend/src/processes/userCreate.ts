import api from "@/entities/api";
import type { ApiResult } from "@/shared/models/interfaces";
import { AxiosError } from 'axios'
import type { Router } from 'vue-router'

export const createUser = (login: string, password: string): Promise<ApiResult> => {
    const createUserData = api
    .post("user/create", {
        login: login.toLowerCase(),
        password: password,
    })
    .then(({ data }) => {
        const apiResult: ApiResult = data as ApiResult;
        localStorage.setItem('accessToken', data.access_token)
        localStorage.setItem('expiresAt', data.expires_at)
        window.location.reload()
        return Promise.resolve({
            status:  "success",
            message: apiResult.message,
            code: apiResult.code,
        })
    })
    .catch(({ response }) => {
        const apiResult: ApiResult = response.data as ApiResult;
        switch (apiResult.field) {
        case "password":
            return Promise.reject({
                status:  "error",
                message: apiResult.message,
            })
        case "login":
            return Promise.reject({
                status:  "error",
                message: apiResult.message,
            })
        default:
            break;
        }
    });
  }