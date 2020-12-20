<template>

    <v-card class="profile-card mt-5" elevation="0" style="border: 2px solid #d9e3f1;">

        <v-card-text class="d-flex justify-space-between pl-3 pr-15 align-center">
            <div class="d-flex align-center py-5">
                <v-badge bottom right overlap bordered color="#244F96" offset-x="25" offset-y="25" icon="mdi-camera">
                    <v-avatar size="110" color="grey lighten-3">
                        <img src="https://cdn.discordapp.com/attachments/681583977186066492/789403249555669032/KOt-Rmw87Gw.jpg" :alt="userInfo.name + ' ' + userInfo.secondName">
                        <!-- <v-icon v-else x-large>mdi-account</v-icon> -->
                    </v-avatar>
                </v-badge>
                <div class="user-info d-flex flex-column ml-5 mt-3">
                    <span class="title font-weight-bold black--text">{{ userInfo.name + ' ' + userInfo.secondName }}</span>
                    <p class="body-2" v-if="successProject == 1">{{successProject}} выполненный проект</p>
                    <p class="body-2" v-else>{{successProject}} выполненных проектов</p>
                </div>
            </div>

            <v-list dense>

                <!-- <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="mr-2">mdi-phone-outline</v-icon>
                        <v-list-item-title>
                            <span class="font-weight-bold mr-">Телефон:</span> {{ userInfo.phone }}
                        </v-list-item-title>
                    </v-list-item-icon>
                </v-list-item> -->

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="mr-2">mdi-email-outline</v-icon>
                        <v-list-item-title>
                            <span class="font-weight-bold mr-">Email:</span> {{ userInfo.email }}
                        </v-list-item-title>
                    </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="mr-2">mdi-city</v-icon>
                            <v-list-item-title>
                                <span class="font-weight-bold mr-">Город:</span> {{ userInfo.city }}
                            </v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item>

                <div v-if="userInfo.socialLinks && (userInfo.socialLinks.vk || userInfo.socialLinks.telegram)">
                    <v-list-item v-if="userInfo.socialLinks.vk">
                        <v-list-item-icon>
                            <v-icon class="mr-2">mdi-vk</v-icon>
                            <v-list-item-title>
                                <span class="font-weight-bold mr-">Вконтакте:</span> {{ userInfo.socialLinks.vk }}
                            </v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item>

                    <v-list-item v-else>
                        <v-list-item-icon>
                            <v-icon class="mr-2">mdi-telegram</v-icon>
                            <v-list-item-title>
                                <span class="font-weight-bold mr-">Telegram:</span> {{ userInfo.socialLinks.telegram }}
                            </v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item>

                </div>

            </v-list>

            <div class="d-flex" v-if="userInfo.socialLinks">
                <div class="social-block d-flex flex-column align-end mr-3">
                    <v-btn icon large>
                        <v-icon large color="primary">mdi-vk</v-icon>
                    </v-btn>
                    <span class="title">Вконтакте</span>
                    <a class="link subtitle-2" v-if="userInfo.socialLinks.vk" :href="userInfo.socialLinks.vk" target="__blank">{{ userInfo.socialLinks.vk }}</a>
                    <span v-else class="grey--text">Неизвестно</span>
                </div>
                <v-divider vertical></v-divider>
                <div class="social-block d-flex flex-column align-start ml-3">
                    <v-btn icon large>
                        <v-icon large color="primary">mdi-telegram</v-icon>
                    </v-btn>
                    <span class="title">Телеграм</span>
                    <a class="link subtitle-2" v-if="userInfo.socialLinks.telegram" :href="userInfo.socialLinks.telegram" target="__blank">{{ userInfo.socialLinks.telegram }}</a>
                    <span v-else class="grey--text">Неизвестно</span>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['userInfo'],

    data: () => ({
        successProject: null
    }),

    async mounted() {
        const uid = await this.$store.dispatch('getUid')
        this.successProject = await this.$store.dispatch('successProject', uid)
    }
}
</script>