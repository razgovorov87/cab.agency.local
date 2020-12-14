import firebase from 'firebase/app'

export default {
    actions: {
        async addNotification({dispatch, commit}, {uid, notification}) {
            try {
                await firebase.database().ref(`/users/${uid}/notification/`).push({
                    title: notification.title,
                    desc: notification.desc,
                    icon: notification.icon
                })
            } catch (e) {
                throw e
            }
        },

        async fetchNotification({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const response = (await firebase.database().ref(`/users/${uid}/notification`).once('value')).val()
                return response
            } catch (e) {
                throw e
            }
        },

        async deleteNotification({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/notification`).remove()
            } catch (e) {
                throw e
            }
        }

    }
}