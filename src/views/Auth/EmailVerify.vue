<template>
    <div id="emailVerify">
        <v-card elevation="0" style="border: 1px solid #d9e3f1;">
            <v-card-title class="d-flex flex-column align-center justify-center pa-5" style="background-color: #0C213A;">
                <v-icon large color="green darken-2">mdi-check-circle-outline</v-icon>
                <span class="title white--text">Подтвердите Ваш Email</span>
                <span class="subtitle-2 grey--text text-center">На вашу электронную почту было отправлено сообщение<br> с ссылкой для подтверждения email адреса.</span>
                <v-chip x-large label class="my-4">{{email}}</v-chip>
                <v-btn class="verifyBtn body-2 text-decoration-underline" text dark :disabled="timer !== 0" @click="reSendMessage">Сообщение не пришло. Отправить еще раз <span class="ml-1" v-show="timer !== 0">({{timer}})</span></v-btn>
                <router-link to="/auth" class="mt-4 body-1">Вернуться на главную</router-link>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    props: ['formData'],
    data: () => ({
        email: '',
        timer: 0
    }),

    created() {
        if(!this.formData) this.$router.push('/auth')
    },

    async mounted() {
        this.email = this.formData.email
        this.reSendMessage()
    },

    methods: {

        disableBtn() {
            const launchTimer = setInterval( () => {
                this.timer -= 1
                if(this.timer === 0) clearInterval(launchTimer)
            }, 1000)
        },

        async reSendMessage() {
            try {
                await this.$store.dispatch('sendEmailVerify', this.formData)
                this.timer = 60
                this.disableBtn()
            } catch (e) {
                
            }
        }
    }   


}
</script>