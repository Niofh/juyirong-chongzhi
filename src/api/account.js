import request from '@/utils/request'

// 1.6账户余额
export function getAccountWalletDetail(data) {
  return request({
    url: '/renting/wallet/walletDetail',
    method: 'get',
    params: data
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
