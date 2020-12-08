<template>
    <v-col cols="3">
                <v-card elevation="0" style="border: 1px solid #d9e3f1;">
                    <div class="card-header pa-3">
                        <p class="overline primary--text ma-0">Квартира</p>
                        <v-card-title class="font-weight-black pa-0 mb-2">2-х комнатная квартира</v-card-title>
                        <p class="subtitle-2 ma-0">
                            <v-icon small>mdi-map-marker</v-icon>
                            <span class="font-weight-light ml-1">г. Москва, ул.Пушкина 143, кв.52</span>
                        </p>
                    </div>
                    <v-img src="http://h-area.torbara.com/images/image.png" width="100%" class="pa-3">
                        <v-chip color="#4192F2" class="ml-2 white--text overline">Аренда</v-chip>
                        <v-chip color="#F74C55" class="ml-2 white--text overline">Продажа</v-chip>
                    </v-img>
                    <v-card-text class="px-3">
                        <div style="border-bottom: 1px solid #d9e3f1;" class="pa-2 d-flex justify-space-around">
                            <p class="house-option ma-0 subtitle-2">
                                    Спален: 1
                            </p>
                            <p class="house-option ma-0 subtitle-2">
                                    Ванных: 1
                            </p>
                            <p class="house-option ma-0 subtitle-2">
                                    м<sup>2</sup>: 50
                            </p>
                        </div>
                        <div class="house-currency d-flex justify-space-around align-center mt-5 mb-3">
                            <div class="currency">
                                <p class="headline black--text ma-0">{{ 2000000 | currency('RUB')}}</p>
                                <p class="body-2 ma-0">{{ 1350 | currency('RUB') }} / м<sup>2</sup> </p>
                            </div>
                            <div class="buttons">
                                <v-btn icon outlined color="primary" class="mr-2">
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-btn>
                                <v-btn icon outlined color="error">
                                    <v-icon>mdi-heart-outline</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-card-text>
                    <div class="house-footer grey lighten-3 pa-5 d-flex justify-space-between align-center">
                        <div class="house-status">
                            <v-avatar class="success">
                                <v-icon color="white">mdi-check</v-icon>
                            </v-avatar>
                            <span class="overline success--text ml-2">Выполнено!</span>
                        </div>
                        <div class="status-calendar">
                            <v-icon small color="grey">mdi-calendar</v-icon>
                            <span class="body-2 ml-1 grey-darken-1=-text">2 дня назад</span>
                        </div>
                    </div>
                </v-card>
            </v-col>
</template>