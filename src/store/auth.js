import firebase from 'firebase/app'

export default {
    actions: {

        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                dispatch('checkBan')
            } catch (e) {throw e}
        },

        async checkBan({dispatch, commit}) {
            const user = firebase.auth().currentUser
            const response = (await firebase.database().ref(`/archive/users/${user.uid}`).once('value')).val()
            if( response ) {
                return 'banned'
            } 
        },

        async register({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    email,
                    regDate: new Date().toJSON()
                })
            } catch (e) {throw e}
        },

        async saveUserInfo({dispatch, commit}, formData) {
            try {
                const user = firebase.auth().currentUser
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