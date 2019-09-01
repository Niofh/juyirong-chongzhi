import request from '@/utils/request'
import { getUserName } from '../utils/auth'

export function login(data) {
  return request({
    url: '/renting/wallet/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    console.log(getUserName())
    if (getUserName()) {
      resolve({
        data: {
          name: getUserName(),
          avatar: ''
        }
      })
    } else {
      reject()
    }
  })
}

export function logout() {
  return request({
    url: '/renting/wallet/logout',
    method: 'get'
  })
}
