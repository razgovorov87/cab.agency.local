<template>
    <v-card elevation="0" style="border: 1px solid #d9e3f1;">
                <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="subtitle-1">Смена пароля</v-card-title>
                <v-card-text>
                    <v-form id="change_password-form" disabled>
                        
                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Текущий пароль</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    :type="currentPassword ? 'text' : 'password'"
                                    @click:append="currentPassword = !currentPassword"
                                    :append-icon="currentPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    hint="Забыли пароль?"
                                    placeholder="Текущий пароль"
                                    class="d-flex align-center ma-0"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Новый пароль</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    :type="newPassword ? 'text' : 'password'"
                                    @click:append="newPassword = !newPassword"
                                    :append-icon="newPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    hint="Забыли пароль?"
                                    placeholder="Новый пароль"
                                    class="d-flex align-center ma-0"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right">Повторите пароль</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    :type="confirmPassword ? 'text' : 'password'"
                                    @click:append="confirmPassword = !confirmPassword"
                                    :append-icon="confirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    hint="Никому не сообщайте свой пароль"
                                    persistent-hint
                                    placeholder="Повторите пароль"
                                    class="d-flex align-center ma-0"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="7" offset="4">
                                <v-btn color="primary" small disabled>Изменить пароль</v-btn>
                            </v-col>
                        </v-row>


                    </v-form>
                </v-card-text>
            </v-card>
</template>

<script>
export default {
    data: () => ({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
        photo: ''
    }),

    methods: {
        async upload() {
            console.log(this.photo)
            await this.$store.dispatch('uploadPhoto', this.photo)
        }
    }
}
</script>