import { http } from '@/utils/http'


export const Login = data => {
  return http({
    url: '/bl/calendar/system/login',
    method: 'post',
    data,
  })
}