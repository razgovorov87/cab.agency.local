<template>
    <div id="login">
        <v-form class="px-7 pa-5" ref="loginform">
            <span class="overline">Email</span>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                outlined
                dense
                class="mb-3"
                placeholder="Введите ваш Email"
            >
            </v-text-field>

            <span class="overline">Пароль</span>
            <v-text-field
                v-model="password"
                :rules="passwordRules"
                outlined
                dense
                placeholder="Введите ваш пароль"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            >
            </v-text-field>
            <div class="auth-help d-flex align-center justify-space-between">
                <v-switch v-model="rememberSwitch" dense inset label="Запомнить меня"></v-switch>
                <div class="forgot-password d-flex align-center">
                    <v-btn small elevation="0" color="white" class="primary--text">
                        <v-icon left>mdi-lock</v-icon>
                        Забыли пароль?
                    </v-btn>
                </div>
            </div>
            <v-btn color="primary" block class="mb-2" @click="login()":loading="btnLoading">Авторизация<v-icon right>mdi-login</v-icon></v-btn>
        </v-form>
        <div class="auth-footer" style="border-top: 1px solid #d9e3f1;">
            <p class="caption d-flex py-5 justify-center align-center ma-0">Медиан © 2020</p>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        showPassword: false,
        rememberSwitch: false,
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
        btnLoading: false
    }),

    methods: {
        async login() {

            if( this.$refs.loginform.validate() ) {
                this.btnLoading = true
                const formData = {
                    email: this.email,
                    password: this.password
                }

                
                try {
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                } catch (e) {
                    console.log(e)
                }
            }

        }
    }
}
</script>