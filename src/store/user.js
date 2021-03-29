import firebase from 'firebase/app'

export default {
    actions: {
        async deleteUser({dispatch, commit}, user) {
            const info = (await (firebase.database().ref(`/users/${user.id}`).once('value'))).val()
            await firebase.database().ref(`/users/${user.id}`).remove()
            await firebase.database().ref(`/archive/users/${user.id}`).set(info)
        },

        async resetPassword({dispatch, commit}, {email}) {
            const users = await dispatch('fetchUsers')
            const findUser = users.filter(item => item.info.email === email)
            if(!findUser.length) return 'user_not_found'
            else {
                await firebase.auth().sendPasswordResetEmail(email)
                return 'success'
            }
        }
    }
}