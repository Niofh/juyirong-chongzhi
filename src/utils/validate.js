/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const numberReg = (rule, value, callback) => {
  const pattrn = /^((?!0)\d+(\.\d+)?)$/g
  if (!pattrn.test(value)) {
    callback(new Error('输入正确金额'))
  } else {
    callback()
  }
}

