import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from "@/entities/api";
import type { ApiResult } from '@/shared/models/interfaces';
import type { AxiosError, AxiosResponse } from 'axios';

export const useRegistrationStore = defineStore('registration', () => {  
  const createUser = async (login: string, password: string): Promise<ApiResult> => {
    try {
        const apiResponse: AxiosResponse = await api
          .post("user/create", {
              login: login.toLowerCase(),
              password: password,
          })
          return Promise.resolve(apiResponse.data)

    } catch (error) {
        const err: AxiosError = error as AxiosError
        const apiError: AxiosResponse | undefined = err.response
        return Promise.reject(apiError?.data)
    }
  };

  return { createUser }
})
