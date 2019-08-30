import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/renting/wallet/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/renting/wallet/logout',
    method: 'post'
  })
}
