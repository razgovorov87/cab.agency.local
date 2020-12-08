<template>
    <div id="login">
        <v-form class="px-7 pa-5">
            <span class="overline">Логин</span>
            <v-text-field
                outlined
                dense
                hide-details
                class="mb-3"
                placeholder="Введите ваш логин"
            >
            </v-text-field>

            <span class="overline">Пароль</span>
            <v-text-field
                outlined
                dense
                hide-details
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
            <v-btn color="primary" block class="mb-2">Авторизация<v-icon right>mdi-login</v-icon></v-btn>
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
        rememberSwitch: false
    }),
}
</script>