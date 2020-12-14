<template>
    <v-col col="6">
            <v-card elevation="0" style="border: 1px solid #d9e3f1;">
                <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="subtitle-1">Персональная информация</v-card-title>
                <v-card-text class="py-5">
                    <v-form id="personal-form">

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Имя</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    class="d-flex align-center ma-0"
                                    :value="info.name"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Фамилия</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    class="d-flex align-center ma-0"
                                    :value="info.secondName"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Телефон</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    class="d-flex align-center ma-0"
                                    :value="info.phone"
                                    v-mask="'+7(###) ###-##-##'"
                                    prepend-inner-icon="mdi-phone"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Email</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    class="d-flex align-center ma-0"
                                    :value="info.email"
                                    prepend-inner-icon="mdi-at"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Город</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    class="d-flex align-center ma-0"
                                    :value="info.city"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Вконтакте</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    prepend-inner-icon="mdi-vk"
                                    class="d-flex align-center ma-0"
                                    :value="info.socialLinks.vk"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Telegram</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    outlined 
                                    dense
                                    hide-details
                                    prepend-inner-icon="mdi-telegram"
                                    class="d-flex align-center ma-0"
                                    :value="info.socialLinks.telegram"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="7" offset="4">
                                <v-btn color="primary" small>Сохранить</v-btn>
                                <v-btn color="error" small class="ml-2">Стереть</v-btn>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
</template>

<script>
export default {
    props: ['info']
}
</script>

<style>
#personal-form .v-input__prepend-outer {
    margin: 0 !important;
}
</style>