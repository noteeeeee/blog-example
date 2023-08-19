import { useAxios as axiosUse, UseAxiosOptions } from '@vueuse/integrations/useAxios'
import axios, { AxiosRequestConfig } from "axios"

export const useAxiosInstance = () => {
  const runtimeConfig = useRuntimeConfig()
  const accessToken = useAccessToken()

  return axios.create({
    baseURL: runtimeConfig.public.apiBaseurl,
    headers: {
      ...accessToken ? {
        Authorization: `Bearer ${accessToken}`
      } : undefined
    },
  })
}

export const useAxios = <T>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return axiosUse<T>(url, {
    method: "GET",
    ...config
  }, useAxiosInstance(), { 
    immediate: true,
    shallow: true,
    ...options 
  })
}

export const useAxiosPost = <T>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return axiosUse<T>(url, {
    method: "POST",
    ...config,
  }, useAxiosInstance(), { 
    immediate: true,
    shallow: true,
    ...options 
  })
}

export const useAxiosDelete = <T>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return axiosUse<T>(url, {
    method: "DELETE",
    ...config
  }, useAxiosInstance(), { 
    immediate: true,
    shallow: true,
    ...options 
  })
}

export const useAxiosPatch = <T>(url: string, config?: AxiosRequestConfig, options?: UseAxiosOptions) => {
  return axiosUse<T>(url, {
    method: "PATCH",
    ...config
  }, useAxiosInstance(), { 
    immediate: true,
    shallow: true,
    ...options 
  })
}