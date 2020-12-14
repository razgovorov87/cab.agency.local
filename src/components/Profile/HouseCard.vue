<template>
    <v-col cols="3">
                <v-card elevation="0" style="border: 1px solid #d9e3f1;"  @click="$router.push('/houses/' + house.id)">
                    <div class="card-header pa-3">
                        <p class="overline primary--text ma-0">{{house.type}}</p>
                        <v-card-title class="font-weight-black pa-0 mb-2">{{house.title}}</v-card-title>
                        <p class="subtitle-2 ma-0">
                            <v-icon small>mdi-map-marker</v-icon>
                            <span class="font-weight-light ml-1">{{house.adress}}</span>
                        </p>
                    </div>
                    <v-img src="http://h-area.torbara.com/images/image.png" width="100%" class="pa-3">
                        <v-chip color="#4192F2" class="ml-2 white--text overline" v-if="house.rent">Аренда</v-chip>
                        <v-chip color="#F74C55" class="ml-2 white--text overline" v-if="house.sale">Продажа</v-chip>
                    </v-img>
                    <v-card-text class="px-3">
                        <div style="border-bottom: 1px solid #d9e3f1;" class="pa-2 d-flex justify-space-around">
                            <p class="house-option ma-0 subtitle-2">
                                    Спален: {{house.bedrooms}}
                            </p>
                            <p class="house-option ma-0 subtitle-2">
                                    Ванных: {{house.bethrooms}}
                            </p>
                            <p class="house-option ma-0 subtitle-2">
                                    м<sup>2</sup>: {{house.area}}
                            </p>
                        </div>
                        <div class="house-currency d-flex justify-space-around align-center mt-5 mb-3">
                            <div class="currency">
                                <p class="headline black--text ma-0">{{ house.price | currency('RUB')}}</p>
                                <p class="body-2 ma-0">{{ (house.price / house.area) | currency('RUB') }} / м<sup>2</sup> </p>
                            </div>
                            <div class="buttons">
                                <v-btn icon outlined color="primary" class="mr-2" :href="house.link" target="__blank">
                                    <v-icon>mdi-open-in-new</v-icon>
                                </v-btn>
                                <v-btn icon outlined color="error" disabled>
                                    <v-icon>mdi-heart-outline</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-card-text>
                    <div class="house-footer grey lighten-3 pa-5 d-flex justify-space-between align-center">
                        <div class="house-status">
                            <v-avatar :class="house.result == 'Выполнено' ? 'success' : 'warning'">
                                <v-icon color="white">
                                    {{ house.result == 'Выполнено' ? 'mdi-check' : 'mdi-clock-outline' }}
                                </v-icon>
                            </v-avatar>
                            <span class="overline ml-2" :class="house.result == 'Выполнено' ? 'success--text' : 'warning--text'">{{house.result}}!</span>
                        </div>
                        <div class="status-calendar">
                            <v-icon small color="grey">mdi-calendar</v-icon>
                            <span class="body-2 ml-1 grey-darken-1=-text">{{getDaysAgo}}</span>
                        </div>
                    </div>
                </v-card>
            </v-col>
</template>

<script>
export default {
    props: ['house'],

    computed: {
        getDaysAgo() {
            const taken = this.$moment(this.house.takenDate)
            const today = this.$moment()

            let ago = today.diff(taken, 'days')
            if(ago !== 0) {
                 switch(ago) {
                    case 1: ago = ago + ' день назад'; break; 
                    case 2: 
                    case 3:
                    case 4: ago = ago + ' дня назад'; break;
                    case 5: 
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10: ago = ago + ' дней назад'; break;
                    default: ago = ago + ' дня(ей) назад'; break;
                }
            } else {
                ago = today.diff(taken, 'hour')
                switch(ago) {
                    case 1: ago = ago + ' час назад'; break; 
                    case 2: 
                    case 3:
                    case 4: ago = ago + ' часа назад'; break;
                    case 5: 
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10: ago = ago + ' часов назад'; break;
                    default: ago = ago + ' час(ов) назад'; break;
                }
            }

            return ago


        }
    }

}
</script>