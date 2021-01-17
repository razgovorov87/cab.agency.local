<template>
    <v-col col="6">
            <v-card elevation="0" style="border: 1px solid #d9e3f1;">
                <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="subtitle-1">Персональная информация</v-card-title>
                <v-card-text class="py-5">
                    <v-form ref="personalform">

                        <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Имя</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
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
                                    v-model="secondName"
                                    :rules="secondNameRules"
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
                                    v-model="phone"
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
                                <p class="text-right ma-0">Город</p>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field 
                                    v-model="city"
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
                                    v-model="vk"
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
                                    v-model="telegram"
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
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Личное фото</p>
                            </v-col>
                            <v-col cols="7">
                                <v-file-input
                                    v-model="passportFront"
                                    required
                                    hide-details
                                    outlined 
                                    accept="image/x-png,image/gif,image/jpeg"
                                    dense
                                    placeholder="Нажмите, чтобы загрузить..."
                                    prepend-icon=""
                                >
                                </v-file-input>
                            </v-col>
                        </v-row>

                        <!-- <v-row>
                            <v-col cols="4" align-self="center">
                                <p class="text-right ma-0">Вторая страница паспорта</p>
                            </v-col>
                            <v-col cols="7">
                                <v-file-input
                                    v-model="passportTwo"
                                    required
                                    hide-details
                                    accept="image/x-png,image/gif,image/jpeg"
                                    placeholder="Нажмите, чтобы загрузить..."
                                    outlined
                                    dense
                                    prepend-icon=""
                                    
                                >
                                </v-file-input>
                            </v-col>
                        </v-row> -->

                        <v-row>
                            <v-col cols="7" offset="4">
                                <v-btn color="primary" small @click="savePersonalUserInfo" :loading="loadingBtn">Сохранить</v-btn>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
</template>

<script>
export default {
    props: ['info'],
    data: () => ({
        name: '',
        nameRules: [
            v => !!v || 'Обязательное поле',
        ],
        secondName: '',
        secondNameRules: [
            v => !!v || 'Обязательное поле',
        ],
        phone: '',
        city: '',
        vk: '',
        telegram: '',
        passportFront: null,
        passportTwo: null,
        loadingBtn: false 
    }),

    mounted() {
        this.name = this.info.name
        this.secondName = this.info.secondName
        this.phone = this.info.phone ? this.info.phone : ''
        this.city = this.info.city ? this.info.city : ''
        this.vk = this.info.socialLinks.vk ? this.info.socialLinks.vk : ''
        this.telegram = this.info.socialLinks.telegram ? this.info.socialLinks.telegram : ''
    },

    methods: {
        async savePersonalUserInfo() {
            if(this.$refs.personalform.validate()) {

                this.loadingBtn = true

                try {
                
                    const formData = {
                        name: this.name,
                        secondName: this.secondName,
                        phone: this.phone,
                        city: this.city,
                        socialLinks: {
                            vk: this.vk,
                            telegram: this.telegram
                        }
                    }

                    const passport = {
                        passportFront: this.passportFront,
                        passportTwo: this.passportTwo
                    }

                    await this.$store.dispatch('savePersonalUserInfo', {formData, passport})

                    this.$emit('refreshPage')

                    this.loadingBtn = false

                } catch (e) {console.log(e)}

            }
        }
    }
}
</script>

<style>
#personal-form .v-input__prepend-outer {
    margin: 0 !important;
}
</style>