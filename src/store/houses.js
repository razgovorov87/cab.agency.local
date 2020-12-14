import firebase from 'firebase/app'

export default {
    actions: {
        async fetchHouses({dispatch, commit}) {
            try {
              const arr = (await firebase.database().ref(`/houses`).once('value')).val()
              return Object.keys(arr).map( key => ( {...arr[key], id: key} ))
            } catch (e) {
                throw e
            }
        },

        async createHouse({dispatch, commit}) {
            try {
                await firebase.database().ref(`/houses`).push({
                    title: '2-х комнатная квартира',
                    adress: 'г. Москва, ул.Пушкина 143, кв.52',
                    type: 'Квартира',
                    price: 200000000,
                    link: 'http://google.com',
                    bedrooms: 2,
                    bethrooms: 1,
                    createDate: new Date().toJSON(),
                    status: 'Свободно',
                    sale: true,
                    rent: true
                })
            } catch (e) {
                throw e
            }
        },


        async selectHouse({dispatch, commit}, {house, uid, date}) {
            try {
                await firebase.database().ref(`/houses/${house.id}/`).update({
                    user: uid,
                    status: 'В обработке'
                })
                await firebase.database().ref(`/users/${uid}/houses`).push({
                    hid: house.id,
                    result: 'В работе',
                    createDate: date
                })
            } catch (e) {
                throw e
            }
        },

        async getHouseById({dispatch, commit}, id) {
            try {
                const house = (await firebase.database().ref(`/houses`).child(id).once('value')).val()
                return {...house, id}
            } catch (e) {
                throw e
            }
        },

        async fetchTakenUser({dispatch, commit}, id) {
            try {
                const user = (await firebase.database().ref(`/users`).child(id).once('value')).val()
                return {...user, id}
            } catch (e) {
                throw e
            }
        },

        async fetchUserHouses({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                let arr = (await firebase.database().ref(`/houses`).once('value')).val()
                arr = Object.keys(arr).map( key => ( {...arr[key], id: key} ))
                const result = []
                arr.forEach( house => {
                    if(house.user == uid) {
                        result.push(house)
                    }
                } )
                return result
            } catch (e) {
                throw e
            }
        },

        async fetchHouseResult({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                let arr = (await firebase.database().ref(`/users/${uid}/houses`).once('value')).val()
                return Object.keys(arr).map( key => ( {...arr[key], id: key} ))
            } catch (e) {
                throw e
            }
        },

    },
}