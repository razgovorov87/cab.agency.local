<template>
    <div id="login">
        <v-form class="px-7 pa-5" ref="registerform" lazy-validation v-model="registerForm">

            <span class="overline">Email</span>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                required
                outlined
                dense
                placeholder="Введите ваш Email"
            >
            </v-text-field>

            <span class="overline">Пароль</span>
            <v-text-field
                outlined
                dense
                v-model="password"
                :rules="passwordRules"
                placeholder="Введите ваш пароль"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            >
            </v-text-field>
            
            <span class="overline">Повторите пароль</span>
            <v-text-field
                v-model="confirmPassword"
                :rules="[confirmPasswordRules.required, passwordConfirmationRule]"
                outlined
                dense
                placeholder="Введите ваш пароль"
                :type="showRePassword ? 'text' : 'password'"
                @click:append="showRePassword = !showRePassword"
                :append-icon="showRePassword ? 'mdi-eye' : 'mdi-eye-off'"
            >
            </v-text-field>

            <div :class="!recaptcha ? 'recaptcha_error' : '' ">
                <vue-recaptcha ref="recaptcha" sitekey="6LetaxEaAAAAADU-8cBZwT59AWY9syM0kUeKl92U" @verify="recaptchaVerify"></vue-recaptcha>
                <span class="recaptcha_msg error--text caption">Не пройдена проверка на робота</span>
            </div>

            <v-btn color="primary" block class="mb-2 mt-3" @click="registerUser()" :loading="btnLoading">Регистрация<v-icon right>mdi-login</v-icon></v-btn>
        </v-form>
        <div class="auth-footer" style="border-top: 1px solid #d9e3f1;">
            <p class="caption d-flex py-5 justify-center align-center ma-0">Медиан © 2020</p>
        </div>
        
        <Snackbar v-bind:options="snackbar" :key="snackbar" />
    </div>
</template>

<script>
import errors from '@/errors'
import Snackbar from '@/components/Snackbar'
import VueRecaptcha from 'vue-recaptcha';
export default {
    data: () => ({
        registerForm: true,
        email: '',
        emailRules: [
            v => !!v || 'Обязательное поле',
            v => /.+@.+\..+/.test(v) || 'Неверный Email',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Обязательное поле',
            v => (v && v.length >= 8) || 'Пароль должен содержать более 8 символов',
        ],
        confirmPassword: '',
        confirmPasswordRules: {
            required: v => !!v || 'Обязательное поле',
        },
        phone: '',
        phoneRules: [
            v => !!v || 'Обязательное поле',
            v => (v && v.length == 18) || 'Телефон должен содержать 12 символов',
        ],
        showPassword: false,
        showRePassword: false,
        acceptSwitch: false,
        btnLoading: false,
        recaptcha: null,
        snackbar: null
    }),

    methods: {
        recaptchaVerify(response) {
            this.recaptcha = response
        },
        async registerUser() {
            if( this.$refs.registerform.validate()  )  {
                this.btnLoading = true
                const formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                }

                
                try {
                    await this.$store.dispatch('register', formData)
                    this.$router.push('/getinfo')
                } catch (e) {
                    console.log(e)
                    const msg = errors[e.code]
                    this.snackbar = {
                        status: true,
                        text: msg,
                        color: 'error'
                    }
                    this.btnLoading = false
                }
            }

        }
    },

    computed: {
        passwordConfirmationRule() {
            return () => (this.password === this.confirmPassword) || 'Пароли не совпадают'
        }
    },

    components: {
        VueRecaptcha,
        Snackbar
    }
}
</script>

<style>
.recaptcha_msg {
    display: none;
}
.recaptcha_error .recaptcha_msg {
    display: block;
}
</style>