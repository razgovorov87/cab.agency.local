import firebase from 'firebase/app'

export default {
    actions: {
        async deleteUser({dispatch, commit}, user) {
            const info = (await (firebase.database().ref(`/users/${user.id}`).once('value'))).val()
            await firebase.database().ref(`/users/${user.id}`).remove()
            await firebase.database().ref(`/archive/users/${user.id}`).set(info)
        }
    }
}