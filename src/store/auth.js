import firebase from 'firebase/app'

export default {
    actions: {

        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {throw e}
        },

        async register({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    email,
                    regDate: new Date()
                })
            } catch (e) {throw e}
        },

        async saveUserInfo({dispatch, commit}, {uid, name, secondName, phone, city, socialLinks, fromSource}) {
            try {
                const user = firebase.auth().currentUser
                await firebase.database().ref(`/users/${uid}/info`).update({
                    name,
                    secondName,
                    phone,
                    city,
                    email: user.email,
                    fromSource,
                    job: 'Обучающийся',
                    socialLinks: {
                        telegram: socialLinks.telegram,
                        vk: socialLinks.vk
                    },
                    photo: '',
                    isAdmin: false
                })
                await dispatch('addNotification', {
                    uid,
                    notification: {
                        title: 'Вы успешно зарегистрировались!',
                        desc: 'Чтобы приступить к работе, вам необходимо пройти обучение',
                        icon: 'mdi-login'
                    }
                })
            } catch (e) {throw e}
        },

        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },

        async logout({dispatch, commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        },

    }
}