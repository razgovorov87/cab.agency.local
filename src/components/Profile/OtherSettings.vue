<template>
    <v-card elevation="0" style="border: 1px solid #d9e3f1;" class="mt-5">
        <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="subtitle-1">Другие настройки</v-card-title>
        <v-card-text class="pa-5">
            <v-switch
                v-model="emailNotificationSwitch"
                inset
                color="success"
                label="Email уведомления"
                dense
                hint="Хотите получать уведомления на электронную почту?"
                persistent-hint
            ></v-switch>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        emailNotificationSwitch: true
    }),
}
</script>