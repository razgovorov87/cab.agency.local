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
        <v-tabs class="mt-5" v-model="tab" style="border-bottom: 1px solid #d9e3f1;">
            <v-tab>Проекты</v-tab>
            <v-tab>Портфолио</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-3">
            <v-tab-item>
                <HouseTabUserPage v-bind:uid="uid" />
            </v-tab-item>
            <v-tab-item> </v-tab-item>
        </v-tabs-items>
    </div>
</template>


<script>
import HouseTabUserPage from '@/components/Profile/HouseTabUserPage'
import UserProfileCard from '@/components/Profile/UserProfileCard'
export default {
    data: () => ({
        tab: null,
        userInfo: null,
        breadcrumbs: [
            {
                text: 'Медиан',
                disabled: true,
            },
            {
                text: 'Пользователи',
                disabled: true,
            },
            {
                text: '',
                disabled: false,
                href: ''
            },
        ],
        uid: null,
        date: new Date()
    }),

    async mounted() {
        this.uid = this.$route.params.id
        this.breadcrumbs[2] = {
            text: this.uid,
            disabled: false,
            href: '/users/' + this.uid
        }
        this.userInfo = await this.$store.dispatch('fetchUserById', this.uid)
    },


    components: {
        UserProfileCard,
        HouseTabUserPage
    }
}
</script>