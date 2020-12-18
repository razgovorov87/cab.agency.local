<template>
    <div class="profile pa-5" v-if="userInfo">

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
            <v-tab>Настройки</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-3">
            <v-tab-item>
                <div v-if="userInfo && !userInfo.verify" class="d-flex justify-center pt-3">
                    <v-chip class="subtitle-2" color="warning">Вы не можете приступить к работе, дождитесь проверки вашего профиля администратором!</v-chip>
                </div>
                <HouseTab v-else/>
            </v-tab-item>
            <v-tab-item>
                <LearningTab />
            </v-tab-item>
            <v-tab-item>
                <SettingsTab v-bind:userInfo="userInfo" />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>


<script>
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
                disabled: false,
                href: 'profile'
            },
        ],
        date: new Date(),
        successProject: null
    }),

    computed: {
        userInfo() {
            return this.$store.getters.info
        },
    },


    components: {
        UserProfileCard,
        HouseTab,
        SettingsTab
    }
}
</script>