import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },

    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state, info) {
            state.info = {}
        }
    },

    actions: {
        async fetchUserInfo({dispatch, commit}) {
            try {
              const uid = await dispatch('getUid')
              const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
              commit('setInfo', info)
            } catch (e) {
                throw e
            }
        },
        async fetchUserById({dispatch, commit}, id) {
            try {
              const info = (await firebase.database().ref(`/users/${id}/info`).once('value')).val()
              return {...info, id}
            } catch (e) {
                throw e
            }
        }
    },

    getters: {
        info: s => s.info
    }
}