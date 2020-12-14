<template>
    <div id="getinfo">
        <v-card elevation="0" style="border: 1px solid #d9e3f1;">
            <v-card-title class="d-flex flex-column align-center justify-center pa-5" style="background-color: #0C213A;">
                <v-icon large color="primary darken-2">mdi-home</v-icon>
                <span class="title white--text">Вы успешно зарегистрировались</span>
                <span class="subtitle-2 grey--text">Пожалуйста, введите данные о себе.</span>
            </v-card-title>
            <v-card-text class="pa-0 ma-0">
                <FetchInfo />
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import FetchInfo from '@/components/Auth/FetchInfo'
export default {
    components: {
        FetchInfo
    }
}
</script>