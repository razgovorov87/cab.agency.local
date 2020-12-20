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

        async fetchUsers({dispatch, commit}) {
            try {
              const info = (await firebase.database().ref(`/users/`).once('value')).val()
              return Object.keys(info).map( key => ( {...info[key], id: key} ))
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
        },

        async savePersonalUserInfo({dispatch, commit}, {formData, passport}) {
            try {
              const uid = await dispatch('getUid') 
              await firebase.database().ref(`/users/${uid}/info`).update(formData)

              if(passport.passportFront && passport.passportTwo) {
                await firebase.storage().ref(`/users/${uid}/passportFront`).put(passport.passportFront)
                const passportFront = await firebase.storage().ref(`/users/${uid}/passportFront`).getDownloadURL()
                await firebase.storage().ref(`/users/${uid}/passportTwo`).put(passport.passportTwo)
                const passportTwo = await firebase.storage().ref(`/users/${uid}/passportTwo`).getDownloadURL()
                await firebase.database().ref(`/users/${uid}/info/passport`).update({
                    passportFront,
                    passportTwo
                })
                
                await firebase.database().ref(`/users/${uid}/info`).update({
                    verify: true
                })
              }

            } catch (e) {
                throw e
            }
        },
    },

    getters: {
        info: s => s.info
    }
}