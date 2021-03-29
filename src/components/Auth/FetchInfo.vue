<template>
    <div id="get-info">
        <v-form class="px-7 pa-5" ref="getinfoform" lazy-validation>

            <span class="overline">Имя</span>
            <v-text-field
                v-model="name"
                :rules="nameRules"
                required
                outlined
                dense
                placeholder="Введите ваше имя"
            >
            </v-text-field>

            <span class="overline">Фамилия</span>
            <v-text-field
                v-model="secondName"
                :rules="secondNameRules"
                required
                outlined
                dense
                placeholder="Введите вашу фамилию"
            >
            </v-text-field>

            <span class="overline">Телефон</span>
            <v-text-field
                v-model="phone"
                :rules="phoneRules"
                required
                outlined
                dense
                placeholder="Введите ваш телефон"
                v-mask="'+7 (###) ###-##-##'"
                
            >
            </v-text-field>

            <span class="overline">Город</span>
            <v-text-field
                v-model="city"
                :rules="cityRules"
                required
                outlined
                dense
                placeholder="Введите ваш город"
                
            >
            </v-text-field>

            

            <v-btn color="primary" block class="mb-2" @click="saveUserInfo()" :loading="btnLoading">Отправить<v-icon right>mdi-login</v-icon></v-btn>
        </v-form>
        <div class="auth-footer" style="border-top: 1px solid #d9e3f1;">
            <p class="caption d-flex py-5 justify-center align-center ma-0">Медиан © 2020</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['userInfo'],
    data: () => ({
        uid: null,
        name: '',
        nameRules: [
            v => !!v || 'Обязательное поле',
        ],
        secondName: '',
        secondNameRules: [
            v => !!v || 'Обязательное поле',
        ],
        phone: '',
        phoneRules: [
            v => !!v || 'Обязательное поле',
        ],
        city: '',
        cityRules: [
            v => !!v || 'Обязательное поле',
        ],
        btnLoading: false
    }),
    
    async mounted() {
        this.uid = await this.$store.dispatch('getUid')
    },

    methods: {
        async saveUserInfo() {
            if(this.$refs.getinfoform.validate()) {
                try {
                    this.btnLoading = true
                    let formData = {
                        uid: this.uid,
                        name: this.name,
                        secondName: this.secondName,
                        phone: this.phone,
                        city: this.city,
                        socialLinks: {
                            vk: '',
                            telegram: ''
                        },
                    }

                    await this.$store.dispatch('saveUserInfo', formData)
                    const email = await this.$store.dispatch('fetchEmail')
                    formData = {
                        email
                    }
                    this.$router.push({
                        name: 'Подтверждение почты',
                        path: '/emailVerify',
                        params: {formData}
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
    },


    computed: {
        socialVerify() {
            return () => (this.telegram !== '' || this.vkontakte !== '') || 'Необходимо ввести хотя бы одну соц.сеть'
        },
    }
}
</script>