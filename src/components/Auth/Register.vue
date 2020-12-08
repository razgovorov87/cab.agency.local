<template>
    <div id="login">
        <v-form class="px-7 pa-5" ref="registerform" lazy-validation v-model="registerForm">
            <span class="overline">Логин</span>
            <v-text-field
                v-model="login"
                :rules="loginRules"
                required
                outlined
                dense
                placeholder="Введите ваш логин"
            >
            </v-text-field>

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

            <span class="overline">Телефон</span>
            <v-text-field
                v-model="phone"
                :rules="phoneRules"
                outlined
                dense
                placeholder="Введите ваш телефон"
                return-masked-value
                v-mask="'+7 (###) ###-##-##'"
            >
            </v-text-field>
            <v-btn color="primary" block class="mb-2" @click="registerUser()">Регистрация<v-icon right>mdi-login</v-icon></v-btn>
        </v-form>
        <div class="auth-footer" style="border-top: 1px solid #d9e3f1;">
            <p class="caption d-flex py-5 justify-center align-center ma-0">Медиан © 2020</p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        registerForm: true,
        login: '',
        loginRules: [
            v => !!v || 'Обязательное поле',
        ],
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
        acceptSwitch: false
    }),

    methods: {
        async registerUser() {
            if( this.$refs.registerform.validate() ) {
                const formData = {
                    login: this.login,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                }

                
                await this.$store.dispatch('register', formData)
            }

        }
    },

    computed: {
        passwordConfirmationRule() {
            return () => (this.password === this.confirmPassword) || 'Пароли не совпадают'
        }
    }
}
</script>