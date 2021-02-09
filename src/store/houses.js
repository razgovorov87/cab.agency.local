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

        async saveDecision({dispatch, commit}, decision) {
            try {
                const uid = await dispatch('getUid')
                const house = (await firebase.database().ref(`/houses/${decision.id}`).once('value')).val()
                await firebase.database().ref(`/houses/${decision.id}/decision`).update(decision)
                if(house.takenUser) {
                    await firebase.database().ref(`/houses/${decision.id}/`).update({
                        status: decision.decision == "Больше не звонить, назначенна встреча" ? "Выполнено" : "В работе",
                    })
                } else {
                    await firebase.database().ref(`/houses/${decision.id}/`).update({
                        status: decision.decision == "Больше не звонить, назначенна встреча" ? "Выполнено" : "В работе",
                        takenUser: uid,
                        takenDate: new Date().toJSON()
                    })
                }
                
            } catch (e) {
                throw e
            }
        },

        async saveHouseInfo({dispatch, commit}, formData) {
            try {
                await firebase.database().ref(`/houses/${formData.id}/info`).update(formData)
            } catch (e) {
                throw e
            }
        },

        async saveHouseFullInfo({dispatch, commit}, {info, decision, checkDisable}) {
            try {
                await firebase.database().ref(`/houses/${info.id}/info`).update(info)
                await firebase.database().ref(`/houses/${info.id}/decision`).update(decision)
                await firebase.database().ref(`/houses/${info.id}/`).update({
                    status: decision.decision == "Больше не звонить, назначенна встреча" ? "Выполнено" : "В работе",
                })
            } catch (e) {
                throw e
            }
        },

        async deleteHouse({dispatch, commit}, item) {
            try {
                await firebase.database().ref(`/houses/${item.id}`).remove()
            } catch (e) {
                throw e
            }
        },

        async successProject({dispatch, commit}, id) {
            try {
                let num = 0
                const houses = (await firebase.database().ref(`/houses`).once('value')).val()
                Object.keys(houses).forEach(key => {
                    if( houses[key].takenUser == id && houses[key].status == 'Выполнено') num++
                })
                return num
            } catch (e) {
                throw e
            }
        },


        async takenNewProject({dispatch, commit}) {
            try {
                const houses = (await firebase.database().ref(`/houses`).once('value')).val()
                const idx = Object.keys(houses).find( key => !houses[key].takenUser)
                return {...houses[idx], id: idx}
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
                    if(house.takenUser == uid) {
                        result.push(house)
                    }
                } )
                return result
            } catch (e) {
                throw e
            }
        },


        async fetchUserHousesById({dispatch, commit}, uid) {
            try {
                let arr = (await firebase.database().ref(`/houses`).once('value')).val()
                arr = Object.keys(arr).map( key => ( {...arr[key], id: key} ))
                const result = []
                arr.forEach( house => {
                    if(house.takenUser == uid) {
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

        async archiveHouse({dispatch, commit}, info) {
            try {
                const house = (await firebase.database().ref(`/houses/${info.id}`).once('value')).val()
                await firebase.database().ref(`/houses/${info.id}`).remove()
                await firebase.database().ref(`/archive/houses/${info.id}`).set(house)
                await firebase.database().ref(`/archive/houses/${info.id}`).update({
                    decision: info.decision,
                    comment: info.comment
                })
            } catch (e) {
                throw e
            }
        },

        async reloadHouse({dispatch, commit}, id) {
            try {
                const house = (await firebase.database().ref(`/houses/${id}`).once('value')).val()
                await firebase.database().ref(`/houses/${id}`).remove()
                await firebase.database().ref(`/houses/`).push(house)
            } catch (e) {
                throw e
            }
        },

    },
}