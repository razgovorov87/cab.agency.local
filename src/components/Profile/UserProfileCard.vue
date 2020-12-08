<template>

    <v-card class="profile-card mt-5" elevation="0" style="border: 2px solid #d9e3f1;">
        <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <v-card-text class="d-flex justify-space-between pl-3 pr-15 align-center">
            <div class="d-flex align-center py-5">
                <v-badge bottom right overlap bordered color="#244F96" offset-x="25" offset-y="25" icon="mdi-camera">
                    <v-avatar size="110">
                        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="">
                    </v-avatar>
                </v-badge>
                <div class="user-info d-flex flex-column ml-5 mt-3">
                    <span class="title font-weight-bold">John Doe</span>
                    <p class="body-2">Веб-разработчик</p>
                </div>
            </div>

            <v-list dense>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="mr-2">mdi-phone-outline</v-icon>
                        <v-list-item-title>
                            <span class="font-weight-bold mr-">Телефон:</span> +7 (123) 456 7890
                        </v-list-item-title>
                    </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="mr-2">mdi-email-outline</v-icon>
                        <v-list-item-title>
                            <span class="font-weight-bold mr-">Email:</span> johndoe@gmail.com
                        </v-list-item-title>
                    </v-list-item-icon>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="mr-2">mdi-telegram</v-icon>
                        <v-list-item-title>
                            <span class="font-weight-bold mr-">Telegram:</span> @telegram
                        </v-list-item-title>
                    </v-list-item-icon>
                </v-list-item>

            </v-list>

            <div class="d-flex">
                <div class="social-block d-flex flex-column align-end mr-3">
                    <v-btn icon large>
                        <v-icon large color="primary">mdi-vk</v-icon>
                    </v-btn>
                    <span class="title">Вконтакте</span>
                    <a class="link subtitle-2">#userid</a>
                </div>
                <v-divider vertical></v-divider>
                <div class="social-block d-flex flex-column align-start ml-3">
                    <v-btn icon large>
                        <v-icon large color="primary">mdi-telegram</v-icon>
                    </v-btn>
                    <span class="title">Телеграм</span>
                    <a class="link subtitle-2">@telegram</a>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>