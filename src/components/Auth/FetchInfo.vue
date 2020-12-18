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

            <span class="overline">Паспорт</span>
            <v-file-input
                v-model="passportFront"
                :rules="passportFrontRules"
                required
                outlined
                dense
                prepend-icon="mdi-book-open-outline"
                placeholder="Первая страница паспорта"
                
            >
            </v-file-input>

            <v-file-input
                v-model="passportTwo"
                :rules="passportTwoRules"
                required
                outlined
                dense
                prepend-icon="mdi-book-open-outline"
                placeholder="Страница с пропиской"
                
            >
            </v-file-input>

            <v-btn color="primary" block class="mb-2" @click="saveUserInfo()" :loading="btnLoading">Отправить<v-icon right>mdi-login</v-icon></v-btn>
        </v-form>
        <div class="auth-footer" style="border-top: 1px solid #d9e3f1;">
            <p class="caption d-flex py-5 justify-center align-center ma-0">Медиан © 2020</p>
        </div>
    </div>
</template>

<script>
export default {
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
        passportFront: null,
        passportFrontRules: [
            v => !!v || 'Обязательное поле',
        ],
        passportTwo: null,
        passportTwoRules: [
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
                    const formData = {
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

                    const passport = {
                        passportFront: this.passportFront,
                        passportTwo: this.passportTwo
                    }

                    await this.$store.dispatch('saveUserInfo', {formData, passport})
                    this.$router.push('/')
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