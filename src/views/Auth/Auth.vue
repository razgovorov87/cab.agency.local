<template>
    <div>
        <v-card elevation="0" style="border: 1px solid #d9e3f1;">
            <v-card-title class="d-flex flex-column align-center justify-center pa-5" style="background-color: #0C213A;">
                <v-icon large color="primary darken-2">mdi-home</v-icon>
                <span class="title white--text">Добро пожаловать</span>
                <span class="subtitle-2 grey--text">Войдите или зарегистрируйтесь для работы в приложении.</span>
            </v-card-title>
            <v-card-text class="pa-0 ma-0">

                <v-tabs v-model="authTabs">
                    <v-tab>Авторизация</v-tab>
                    <v-tab>Регистрация</v-tab>
                </v-tabs>

                <v-tabs-items v-model="authTabs">
                    <v-tab-item><Login /></v-tab-item>
                    <v-tab-item><Register /></v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
export default {
    data: () => ({
        authTabs: null
    }),

    components: {
        Login,
        Register
    }
}
</script>