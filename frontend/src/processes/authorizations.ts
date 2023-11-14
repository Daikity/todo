import api from "@/entities/api";
import { AxiosError } from 'axios'
import type { ApiResult } from "@/shared/models/interfaces";
import type { Router } from 'vue-router'

export const login = async (login: string, password: string): Promise<ApiResult> => {
  try {
    const { data } = await api.post('/user/login', {
      data: {
        login: login,
        password: password,
      },
    })

    localStorage.setItem('accessToken', data.access_token)
    localStorage.setItem('expiresAt', data.expires_at)
    window.location.reload()
    return Promise.resolve({
      status: status,
      message: statusText,
    })
  } catch (err: AxiosError | any) {
    const { response } = err
    return Promise.reject({
      status: response.data.code,
      message: response.data.message,
    })
  }
}

export const logout = (router: Router): void => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('expiresAt')
  window.location.reload()
  router.push('login')
}

export const checkAuth = (): boolean => {
  const accessToken: string | null = localStorage.getItem('accessToken')
  const expiresAt: number | null = Number(localStorage.getItem('expiresAt'))
  if (accessToken && expiresAt) {
    if (expiresAt === new Date().getTime()) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expiresAt')
      return false
    } else return true
  }
  return false
}
