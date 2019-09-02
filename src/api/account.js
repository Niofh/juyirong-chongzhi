import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 1.6账户余额
export function getAccountWalletDetail(data) {
  return request({
    url: '/renting/wallet/walletDetail',
    method: 'get',
    params: data
  })
}

// 1.2充值试算

export function rechargeTrialApi(data) {
  return request({
    url: '/renting/wallet/rechargeTrial',
    method: 'post',
    data
  })
}
// 1.3账户充值
export function accountRechargeApi(data) {
  return request({
    url: '/renting/wallet/recharge',
    method: 'post',
    data
  })
}

// 1.4交易明细
export function accountDetailApi(data) {
  return request({
    url: '/renting/wallet/inexpDetail',
    method: 'post',
    data
  })
}

// 1.5 导出
export function exportDetailList(data) {
  return process.env.VUE_APP_BASE_API + `/renting/wallet/exportDetailList/${getToken()}`
}
