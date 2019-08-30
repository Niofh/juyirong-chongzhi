import request from '@/utils/request'

// 1.6账户余额
export function getAccountWalletDetail(data) {
  return request({
    url: '/renting/wallet/walletDetail',
    method: 'get',
    params: data
  })
}
