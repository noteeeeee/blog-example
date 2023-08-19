import { useJwt } from '@vueuse/integrations/useJwt'
import { Ref } from 'nuxt/dist/app/compat/capi'

export const useAccessToken = () => {
  if (!process.client) return undefined

  const accessToken = ref(localStorage.getItem("accessToken"))
  if (!accessToken.value) return undefined
  
  const { payload } = useJwt(accessToken as Ref<string>)
  
  if (payload.value?.sub && new Date(payload.value?.exp! * 1000) > new Date())
    return accessToken.value
  else return undefined
}