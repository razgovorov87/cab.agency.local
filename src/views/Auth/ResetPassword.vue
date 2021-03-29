<template>
    <div id="getinfo">
        <v-card elevation="0" style="border: 1px solid #d9e3f1;">
            <v-card-title class="d-flex flex-column align-center justify-center pa-5" style="background-color: #0C213A;">
                <v-icon large color="primary darken-2">mdi-lock</v-icon>
                <span class="title white--text">Сброс пароля</span>
                <span class="subtitle-2 grey--text text-center">Пожалуйста, введите ваш Email. Мы отправим<br> вам ссылку для восстановления пароля</span>
            </v-card-title>
            <v-card-text class="pa-0 ma-0">
                <v-form ref="resetPass" class="px-7 pa-5" @submit.prevent="resetPassword">
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
                    <v-btn color="primary" block class="mb-2" @click="resetPassword" :loading="btnLoading" :disabled="timer !== 0">Сбросить пароль <span class="ml-1" v-show="timer !== 0">({{timer}})</span></v-btn>
                    <div class="text-center mt-4">
                        <router-link to="/auth" class="body-1">Вернуться на главную</router-link>
                    </div>
                </v-form>
                <div class="auth-footer" style="border-top: 1px solid #d9e3f1;">
                    <p class="caption d-flex py-5 justify-center align-center ma-0">Медиан © 2020</p>
                </div>


                
                <Snackbar v-bind:options="snackbar" :key="snackbar" />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Snackbar from '@/components/Snackbar'
export default {
    data: () => ({
        email: '',
        emailRules: [
            v => !!v || 'Обязательное поле',
            v => /.+@.+\..+/.test(v) || 'Неверный Email',
        ],
        btnLoading: false,
        snackbar: null,
        timer: 0
    }),

    methods: {
        async resetPassword() {
            try {
                if( !this.$refs.resetPass.validate() ) return
                this.btnLoading = true
                const formData = {
                    email: this.email
                }

                const res = await this.$store.dispatch('resetPassword', formData)
                if(res === 'user_not_found') {
                    this.snackbar = {
                        status: true,
                        text: 'Пользователь с таким Email не найден',
                        color: 'error'
                    }
                    this.btnLoading = false
                    return
                }
                else {
                    this.snackbar = {
                        status: true,
                        text: 'На Ваш Email отправлено сообщение с ссылкой для сброса пароля',
                        color: 'success'
                    }
                    this.disableBtn()
                }
                this.btnLoading = false
            } catch (e) {
                
            }
        },


        disableBtn() {
            this.timer = 60
            const launchTimer = setInterval( () => {
                this.timer -= 1
                if(this.timer === 0) clearInterval(launchTimer)
            }, 1000)
        },
    },


    components: {
        Snackbar
    }
}
</script>