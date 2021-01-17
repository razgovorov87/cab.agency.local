<template>
    <div>
        <v-skeleton-loader v-if="loading" type="card"></v-skeleton-loader>
        <div v-else class="profile pa-5" >

            <v-card flat class="d-flex align-center">
                <div>
                    <span class="title">Мой профиль</span>
                    <v-breadcrumbs :items="breadcrumbs" class="pa-0 pt-1"></v-breadcrumbs>
                </div>
                <v-spacer></v-spacer>
                <v-btn outlined small color="#244F96">
                    Сегодня: {{ date | date('monthDay') }}
                </v-btn>
                <v-btn outlined small class="ml-2" color="#244F96">
                    <v-icon>mdi-download-outline</v-icon>
                </v-btn>
            </v-card>

            <UserProfileCard v-bind:userInfo="userInfo" />
            <v-tabs class="mt-5" v-model="tab" style="border-bottom: 1px solid #d9e3f1;" dense>
                <v-tab>Проекты</v-tab>
                <v-tab>Обучение</v-tab>
                <v-tab>Скрипты</v-tab>
                <v-tab>Настройки</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="pa-3">
                <v-tab-item>
                    <div v-if="userInfo && !userInfo.verify" class="d-flex justify-center pt-3">
                        <v-chip class="subtitle-2" color="warning">Для начала работы Вам необходимо загрузить личное фото в настройках профиля</v-chip>
                    </div>
                    <HouseTab v-else/>
                </v-tab-item>
                <v-tab-item>
                    <LearningTab />
                </v-tab-item>
                <v-tab-item>
                    <div class="mb-5 d-flex align-center justify-center flex-column" style="width: 100%;">
                        <v-btn color="primary" class="my-4" href="https://firebasestorage.googleapis.com/v0/b/median-5546c.appspot.com/o/skript_obschenia_s_sobstvennikom.pdf?alt=media&token=5a549df2-104b-4e60-9597-9c42db2a8540" target="__blank"><v-icon class="mr-2">mdi-download</v-icon>Общение с собственником</v-btn>
                        <v-btn color="primary" class="mb-4" href="https://firebasestorage.googleapis.com/v0/b/median-5546c.appspot.com/o/printsipy_partnerstva.pdf?alt=media&token=1fc1bc73-4bcf-4b68-ac2f-f8ea5c099a3c" target="__blank"><v-icon class="mr-2">mdi-download</v-icon>Принципы партнерства</v-btn>
                        <v-btn color="primary" href="https://firebasestorage.googleapis.com/v0/b/median-5546c.appspot.com/o/Vizitka.pdf?alt=media&token=449119b8-b3a7-452b-b335-54482bd5ec1d" target="__blank"><v-icon class="mr-2">mdi-download</v-icon>Визитка</v-btn>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <SettingsTab v-bind:userInfo="userInfo" @refreshPage="refreshPage"/>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </div>
</template>


<script>
import LearningTab from '@/components/Profile/LearningTab'
import SettingsTab from '@/components/Profile/SettingsTab'
import HouseTab from '@/components/Profile/HouseTab'
import UserProfileCard from '@/components/Profile/UserProfileCard'
export default {
    data: () => ({
        tab: null,
        breadcrumbs: [
            {
                text: 'Медиан',
                disabled: true,
            },
            {
                text: 'Мой профиль',
                disabled: true,
            },
        ],
        date: new Date(),
        successProject: null,
        loading: true
    }),

    mounted() {
        this.loading = false
    },

    methods: {
        async refreshPage() {
            this.loading = true
            try {
                await this.$store.dispatch('fetchUserInfo') 
                this.loading = false
            } catch (e) {console.log(e)}
        }
    },

    computed: {
        userInfo() {
            return this.$store.getters.info
        },
    },


    components: {
        UserProfileCard,
        HouseTab,
        SettingsTab,
        LearningTab
    }
}
</script>