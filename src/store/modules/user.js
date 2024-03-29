import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserName } from '@/utils/auth'
import { resetRouter } from '@/router'
import { getUserName, removeUserName } from '@/utils/auth'

const state = {
  token: getToken(),
  name: getUserName(),
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { socialCreditCode, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ socialCreditCode: socialCreditCode.trim(), password: password }).then(response => {
        if (response.status !== 200) {
          reject()
          return
        }
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        setUserName(socialCreditCode)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUserName()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

