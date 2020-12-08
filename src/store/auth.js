import { register } from "register-service-worker";

import axios from 'axios'

export default {
    actions: {
        async register({dispatch, commit}, {login, password, email, phone}) {
            try {
                await axios.get(`http://109.173.88.42:8888/?type=reg&login=${login}&pass=${password}&first_name=John&last_name=Doe&city=Moscow&from_source=site`)
                .then(response => {
                    console.log('good!')
                })
                .catch(e => {
                    console.log(e)
                })
            } catch (e) {
                console.log(e)
                throw e
            }

        } 
    }
}