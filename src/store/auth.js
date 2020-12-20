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

        async saveUserInfo({dispatch, commit}, {formData, passport}) {
            try {
                const user = firebase.auth().currentUser
                await firebase.storage().ref(`/users/${formData.uid}/passport/passportFront`).put(passport.passportFront)
                const passportFrontUrl = await firebase.storage().ref(`/users/${formData.uid}/passport/passportFront`).getDownloadURL()
                await firebase.storage().ref(`/users/${formData.uid}/passport/passportTwo`).put(passport.passportTwo)
                const passportTwoUrl = await firebase.storage().ref(`/users/${formData.uid}/passport/passportTwo`).getDownloadURL()
                await firebase.database().ref(`/users/${formData.uid}/info`).update({
                    name: formData.name,
                    secondName: formData.secondName,
                    phone: formData.phone,
                    city: formData.city,
                    email: user.email,
                    fromSource: '',
                    socialLinks: {
                        telegram: formData.socialLinks.telegram,
                        vk: formData.socialLinks.vk
                    },
                    passport: {
                        passportFront: passportFrontUrl,
                        passportTwo: passportTwoUrl
                    },
                    isAdmin: false,
                    verify: true
                })
                // await dispatch('addNotification', {
                //     uid,
                //     notification: {
                //         title: 'Вы успешно зарегистрировались!',
                //         desc: 'Чтобы приступить к работе, вам необходимо пройти обучение',
                //         icon: 'mdi-login'
                //     }
                // })
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