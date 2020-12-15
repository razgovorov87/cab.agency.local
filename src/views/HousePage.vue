<template>
    <div id="house-page" class="pa-5">
        <v-row>
            <v-col cols="8" v-if="house">
                <v-card class="pa-3 d-flex align-center justify-space-between mb-5" elevation="0" style="border: 2px solid #d9e3f1;">

                    <div v-if="house.info.salePrice" class="price">
                        <span class="title font-weight-bold">{{house.info.salePrice | currency}}</span>
                        <p class="caption ma-0">{{ (house.info.salePrice / house.info.area) | currency }} / м<sup>2</sup></p>
                    </div>

                    <div v-else class="price">
                        <span class="title font-weight-bold">{{house.info.rentPrice | currency}}</span>
                        <p class="caption ma-0">в месяц</p>
                    </div>

                    <div class="header-actions">
                        <v-btn icon class="grey lighten-3 mr-3" disabled>
                            <v-icon color="error">mdi-heart-outline</v-icon>
                        </v-btn>
                        <v-btn class="grey lighten-3 font-weight-light primary--text" rounded elevation="0" target="__blank" :href="house.link">
                            Ссылка на объявление <v-icon class="ml-2" small>mdi-open-in-new</v-icon>
                        </v-btn>
                    </div>

                </v-card>

                <v-card v-if="house" class="pa-3 d-flex align-center justify-space-between mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" class="pa-3" height="450px">
                        <v-chip color="#4192F2" class="ml-2 white--text overline" v-if="house.info.rentPrice">Аренда</v-chip>
                        <v-chip color="#F74C55" class="ml-2 white--text overline" v-if="house.info.salePrice">Продажа</v-chip>
                    </v-img>
                </v-card>

                <v-card v-if="house" class="pa-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title>Детали</v-card-title>
                    <v-card-text>

                        <v-row no-gutters>
                            <v-col cols="4" class="detail-item">ID: {{house.info.id}}</v-col>
                            <v-col cols="4" class="detail-item">Ванных: {{ house.info.bethrooms }}</v-col>
                            <v-col cols="4" class="detail-item text-right">
                                <span v-if="house.takenUser"> Взято в работу: {{ takenDaysAgo }}</span>
                                <span v-else> - </span>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="4" class="detail-item">Площадь: {{house.info.area}} м<sup>2</sup></v-col>
                            <v-col cols="4" class="detail-item">Спален: {{ house.info.bedrooms }}</v-col>
                            <v-col cols="4" class="detail-item text-right">
                                <span v-if="user && house.takenUser"> Исполнитель: {{ user.name + ' ' + user.secondName}}</span>
                                <span v-else> Исполнитель: - </span>
                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-card>

                <v-card v-if="house.info.features" class="pa-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title>Особенности</v-card-title>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.airConditioning ? 'success' : 'grey'">{{ house.info.features.airConditioning ? 'mdi-check' : 'mdi-minus' }}</v-icon> Кондиционер</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.alarmSystem ? 'success' : 'grey'">{{ house.info.features.alarmSystem ? 'mdi-check' : 'mdi-minus' }}</v-icon> Система безопасности</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.kidsCourt ? 'success' : 'grey'">{{ house.info.features.kidsCourt ? 'mdi-check' : 'mdi-minus' }}</v-icon> Детская площадка</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.refrigerator ? 'success' : 'grey'">{{ house.info.features.refrigerator ? 'mdi-check' : 'mdi-minus' }}</v-icon> Холодильник</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.pool ? 'success' : 'grey'">{{ house.info.features.pool ? 'mdi-check' : 'mdi-minus' }}</v-icon> Бассейн</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.TVCable ? 'success' : 'grey'">{{ house.info.features.TVCable ? 'mdi-check' : 'mdi-minus' }}</v-icon> Кабельное телевидение</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.WiFi ? 'success' : 'grey'">{{ house.info.features.WiFi ? 'mdi-check' : 'mdi-minus' }}</v-icon> Wi-Fi</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.washer ? 'success' : 'grey'">{{ house.info.features.washer ? 'mdi-check' : 'mdi-minus' }}</v-icon> Cтиральная машина</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.dishwasher ? 'success' : 'grey'">{{ house.info.features.dishwasher ? 'mdi-check' : 'mdi-minus' }}</v-icon> Посудомоечная машина</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.hob ? 'success' : 'grey'">{{ house.info.features.hob ? 'mdi-check' : 'mdi-minus' }}</v-icon> Газ.плита/Вароч.поверхность</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.info.features.sofa ? 'success' : 'grey'">{{ house.info.features.sofa ? 'mdi-check' : 'mdi-minus' }}</v-icon> Диван</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>
            <v-col v-if="user" cols="4">
                <v-card  class="pa-5 grey lighten-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">

                    <div class="taken-user d-flex align-center mb-5">
                        <v-avatar size="80" color="grey lighten-2">
                            <v-img v-if="user.photo" :src="user.photo"></v-img>
                            <v-icon>mdi-account</v-icon>
                        </v-avatar>
                        <div class="takenUser-info d-flex flex-column ml-3">
                            <span class="title">{{ user.name + ' ' + user.secondName }}</span>
                            <span class="caption" v-if="successProject == 1">{{successProject}} выполненный проект</span>
                            <span class="caption" v-else>{{successProject}} выполненных проектов</span>
                        </div>
                    </div>

                    <div class="user-buttons d-flex mb-3">
                        <v-btn @click="$router.push('/users/' + house.takenUser)" rounded color="white mr-2" class="primary-text" elevation="0"><v-icon class="mr-1">mdi-account-box-multiple-outline</v-icon>Профиль</v-btn>
                        <div clas="d-flex">
                            <v-btn icon class="white mr-2" color="primary" target="__blank" :href="user.socialLinks.vk" :disabled="!user.socialLinks.vk">
                                <v-icon>mdi-vk</v-icon>
                            </v-btn>
                            <v-btn icon class="white" color="primary darken-1" target="__blank" :href="user.socialLinks.telegram" :disabled="!user.socialLinks.telegram">
                                <v-icon>mdi-telegram</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="house.decision" class="d-flex justify-center flex-column">
                        <p v-if="house.decision.decision == 'Перезвонить через N дней'" class="ma-0 my-2 caption">Текущее решение: <v-chip label small color="indigo" class="white--text">Перезвонить через {{house.decision.daysCall}} дней</v-chip></p>
                        <p v-else class="ma-0 my-2 caption">Текущее решение: <v-chip label small color="indigo" class="white--text">{{ house.decision.decision }}</v-chip></p>
                        <p class="ma-0 my-2 caption" v-if="house.decision.comment">Комментарий: {{house.decision.comment}}</p>
                    </div>
                    

                    <div v-if="house.takenUser == currentUserUid">
                        <v-divider></v-divider>

                        <v-card-text>
                            <p class="body-2 ma-0 mb-3">Вы являетесь исполнителем данного проекта, вам необходимо связаться с продавцов и заполнить форму ниже, в зависимости от его ответа!</p>
                            <p class="body-1 ma-0 mb-5">
                                <v-icon color="primary" class="mr-3 grey lighten-2 pa-2" style="border-radius: 50%;">mdi-phone</v-icon>
                                <span>{{ house.info.phone }}</span>
                            </p>

                            <v-form ref="forminfo">
                                <v-select
                                    v-model="select"
                                    :items="selectItems"
                                    :rules="selectRules"
                                    required
                                    outlined 
                                    dense 
                                    placeholder="Выберите нужный вариант"
                                ></v-select>
                                <div v-if="select == 'Перезвонить через N дней'">
                                    <v-text-field
                                        v-model="daysCall"
                                        :rules="[checkDays]"
                                        outlined
                                        dense
                                        type="number"
                                        placeholder="Через сколько дней перезвонить?"
                                    ></v-text-field>
                                </div>
                                <div v-if="select == 'Больше не звонить, назначенна встреча'">
                                    <v-text-field
                                        v-model="dateMeeting"
                                        :rules="[checkSelect]"
                                        outlined
                                        type="date"
                                        placeholder="Дата встречи"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="whoMeeting"
                                        :rules="[checkSelect]"
                                        outlined
                                        placeholder="С кем назначенна встреча"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="placeMeeting"
                                        :rules="[checkSelect]"
                                        outlined
                                        placeholder="Место встречи"
                                    ></v-text-field>
                                </div>
                                <v-textarea outlined placeholder="Комментарий"></v-textarea>
                                <v-btn block color="primary" @click="saveHouseInfo()" :loading="loadingBtn">Отправить</v-btn>
                            </v-form>
                        </v-card-text>
                    </div>

                </v-card>

                <v-card v-if="house && house.info.salePrice" class="grey lighten-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="d-flex flex-column">
                            <span class="title font-weight-normal">{{house.info.salePrice | currency}}</span>
                            <span class="caption font-weight-normal">{{ (house.info.salePrice / house.info.area) | currency}} / м<sup>2</sup></span>
                        </div>
                        <v-chip label color="error">Продажа</v-chip>
                    </v-card-title>
                </v-card>

                <v-card v-if="house && house.info.rentPrice" class="grey lighten-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="d-flex flex-column">
                            <span class="title font-weight-normal">{{house.info.rentPrice | currency}}</span>
                            <span class="caption font-weight-normal">в месяц</span>
                        </div>
                        <v-chip label color="primary">Аренда</v-chip>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    data: () => ({
        house: null,
        user: null,
        takenDate: null,
        select: null,
        selectItems: [
            'Больше не звонить и удалить из базы',
            'Перезвонить через N дней',
            'Больше не звонить, назначенна встреча'
        ],
        selectRules: [
            v => !!v || 'Обязательное поле',
        ],
        dateMeeting: null,
        whoMeeting: null,
        placeMeeting: null,
        decision: null,
        loadingBtn: false,
        currentUserUid: null,
        daysCall: null,
        successProject: 0
    }),

    async mounted() {
        const id = this.$route.params.id
        this.house = await this.$store.dispatch('getHouseById', id)
        this.user = await this.$store.dispatch('fetchUserById', this.house.takenUser)
        this.currentUserUid = await this.$store.dispatch('getUid')

        this.successProject = await this.$store.dispatch('successProject', this.user.id)
    },

    methods: {
        saveHouseInfo() {
            this.loadingBtn = true
            if( this.$refs.forminfo.validate() ) {
                const formData = {

                }
                console.log(this.select)
            }
        }
    },

    computed: {

        takenDaysAgo() {
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
                if( ago !== 0) {
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
                } else {
                    ago = today.diff(taken, 'minute')
                    switch(ago) {
                        case 1: ago = ago + ' минуту назад'; break; 
                        case 2: 
                        case 3:
                        case 4: ago = ago + ' минуты назад'; break;
                        case 5: 
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10: ago = ago + ' минут назад'; break;
                        default: ago = ago + ' минут(ы) назад'; break;
                    }
                }
            }

            return ago


        },

        checkSelect() {
        return () =>
            (this.select == "Перезвонить через N дней" && (this.dateMeeting != '' || this.placeMeeting != '' || this.whoMeeting != '') ) ||
            "Обязательное поле";
        },
        
        checkDays() {
        return () =>
            (this.select == "Перезвонить через N дней" && this.daysCall != '') || "Обязательное поле";
        },
    }
}
</script>