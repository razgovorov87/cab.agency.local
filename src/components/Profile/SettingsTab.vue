<template>
    <v-row>
        <PersonalSettings v-bind:info="userInfo" @refreshPage="refreshPage"/>
        <v-col col="6">
            <ChangePassword />  
            <OtherSettings />   
        </v-col>
    </v-row>
</template>

<script>
import OtherSettings from '@/components/Profile/OtherSettings'
import ChangePassword from '@/components/Profile/ChangePassword'
import PersonalSettings from '@/components/Profile/PersonalSettings'
export default {
    props: ['userInfo'],

    methods: {
        refreshPage() {
            this.$emit('refreshPage')
        }
    },

    components: {
        PersonalSettings,
        ChangePassword,
        OtherSettings
    }
}
</script>