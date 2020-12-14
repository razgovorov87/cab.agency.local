<template>
    <div id="house-page" class="pa-5">
        <v-row>
            <v-col cols="8" v-if="house">
                <v-card class="pa-3 d-flex align-center justify-space-between mb-5" elevation="0" style="border: 2px solid #d9e3f1;">

                    <div class="price">
                        <span class="title font-weight-bold">{{house.price | currency}}</span>
                        <p class="caption ma-0">{{ (house.price / house.area) | currency }} / м<sup>2</sup></p>
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
                    <v-img src="http://h-area.torbara.com/images/image.png" class="pa-3" height="450px">
                        <v-chip color="#4192F2" class="ml-2 white--text overline" v-if="house.rent">Аренда</v-chip>
                        <v-chip color="#F74C55" class="ml-2 white--text overline" v-if="house.sale">Продажа</v-chip>
                    </v-img>
                </v-card>

                <v-card v-if="house && takenUser" class="pa-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title>Детали</v-card-title>
                    <v-card-text>

                        <v-row no-gutters>
                            <v-col cols="4" class="detail-item">ID: {{house.id}}</v-col>
                            <v-col cols="4" class="detail-item">Опубликовано: {{ createDaysAgo }}</v-col>
                            <v-col cols="4" class="detail-item text-right">
                                <span v-if="house.user"> Взято в работу: {{ takenDaysAgo }}</span>
                                <span v-else> - </span>
                            </v-col>
                        </v-row>

                        <v-row no-gutters>
                            <v-col cols="4" class="detail-item">Площадь: {{house.area}} м<sup>2</sup></v-col>
                            <v-col cols="4" class="detail-item">Спален: {{ house.bedrooms }}</v-col>
                            <v-col cols="4" class="detail-item text-right">
                                <span v-if="house.user"> Исполнитель: {{ takenUser.info.name + ' ' + takenUser.info.secondName}}</span>
                                <span v-else> - </span>
                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-card>

                <v-card v-if="house" class="pa-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title>Особенности</v-card-title>
                    <v-card-text>
                        <v-row no-gutters>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.airConditioning ? 'success' : 'grey'">{{ house.features.airConditioning ? 'mdi-check' : 'mdi-minus' }}</v-icon> Кондиционер</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.alarmSystem ? 'success' : 'grey'">{{ house.features.alarmSystem ? 'mdi-check' : 'mdi-minus' }}</v-icon> Система безопасности</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.kidsCourt ? 'success' : 'grey'">{{ house.features.kidsCourt ? 'mdi-check' : 'mdi-minus' }}</v-icon> Детская площадка</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.refrigerator ? 'success' : 'grey'">{{ house.features.refrigerator ? 'mdi-check' : 'mdi-minus' }}</v-icon> Холодильник</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.pool ? 'success' : 'grey'">{{ house.features.pool ? 'mdi-check' : 'mdi-minus' }}</v-icon> Бассейн</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.tvCable ? 'success' : 'grey'">{{ house.features.tvCable ? 'mdi-check' : 'mdi-minus' }}</v-icon> Кабельное телевидение</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.WiFi ? 'success' : 'grey'">{{ house.features.WiFi ? 'mdi-check' : 'mdi-minus' }}</v-icon> Wi-Fi</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.washer ? 'success' : 'grey'">{{ house.features.washer ? 'mdi-check' : 'mdi-minus' }}</v-icon> Cтиральная машина</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.dishwasher ? 'success' : 'grey'">{{ house.features.dishwasher ? 'mdi-check' : 'mdi-minus' }}</v-icon> Посудомоечная машина</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.stove ? 'success' : 'grey'">{{ house.features.stove ? 'mdi-check' : 'mdi-minus' }}</v-icon> Газ.плита/Вароч.поверхность</span>
                            </v-col>
                            <v-col cols="3" class="features-item">
                                <span><v-icon small :color="house.features.sofa ? 'success' : 'grey'">{{ house.features.sofa ? 'mdi-check' : 'mdi-minus' }}</v-icon> Диван</span>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>
            <v-col cols="4">
                <v-card v-if="takenUser" class="pa-5 grey lighten-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">

                    <div class="taken-user d-flex align-center mb-5">
                        <v-avatar size="80" color="grey lighten-2">
                            <v-img v-if="takenUser.info.photo" :src="takenUser.info.photo"></v-img>
                            <v-icon v-else>mdi-account</v-icon>
                        </v-avatar>
                        <div class="takenUser-info d-flex flex-column ml-3">
                            <span class="title">{{ takenUser.info.name + ' ' + takenUser.info.secondName }}</span>
                            <span class="caption" v-if="successProject == 1">{{successProject}} выполненный проект</span>
                            <span class="caption" v-else>{{successProject}} выполненных проектов</span>
                        </div>
                    </div>

                    <div class="user-buttons d-flex mb-3">
                        <v-btn @click="$router.push('/users/' + house.user)" rounded color="white mr-2" class="primary-text" elevation="0"><v-icon class="mr-1">mdi-account-box-multiple-outline</v-icon>Профиль</v-btn>
                        <div clas="d-flex">
                            <v-btn icon class="white mr-2" color="primary" target="__blank" :href="takenUser.info.socialLinks.vk" :disabled="!takenUser.info.socialLinks.vk">
                                <v-icon>mdi-vk</v-icon>
                            </v-btn>
                            <v-btn icon class="white" color="primary darken-1" target="__blank" :href="takenUser.info.socialLinks.telegram" :disabled="!takenUser.info.socialLinks.telegram">
                                <v-icon>mdi-telegram</v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="checkDecision" class="d-flex justify-center flex-column">
                        <p class="ma-0 my-2 caption">Текущее решение: <v-chip label small color="indigo" class="white--text">{{decision.decision}}</v-chip></p>
                        <p class="ma-0 my-2 caption" v-if="decision.comment">Комментарий: {{decision.comment}}</p>
                    </div>
                    

                    <div v-if="house && currentUserId && takenUser && currentUserId == takenUser.id">
                        <v-divider></v-divider>

                        <v-card-text>
                            <p class="body-2 ma-0 mb-3">Вы являетесь исполнителем данного проекта, вам необходимо связаться с продавцов и заполнить форму ниже, в зависимости от его ответа!</p>
                            <p class="body-1 ma-0 mb-5">
                                <v-icon color="primary" class="mr-3 grey lighten-2 pa-2" style="border-radius: 50%;">mdi-phone</v-icon>
                                <span>{{ house.phone }}</span>
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

                <v-card v-if="house && house.sale" class="grey lighten-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="d-flex flex-column">
                            <span class="title font-weight-normal">{{house.price | currency}}</span>
                            <span class="caption font-weight-normal">{{ (house.price / house.area) | currency}} / м<sup>2</sup></span>
                        </div>
                        <v-chip label color="error">Продажа</v-chip>
                    </v-card-title>
                </v-card>

                <v-card v-if="house && house.rent" class="grey lighten-3 mb-5" elevation="0" style="border: 2px solid #d9e3f1;">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="d-flex flex-column">
                            <span class="title font-weight-normal">{{house.price | currency}}</span>
                            <span class="caption font-weight-normal">{{ (house.price / house.area) | currency}} / м<sup>2</sup></span>
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
        takenUser: null,
        takenDate: null,
        currentUserId: null,
        select: null,
        selectItems: [
            'Больше не звонить и удалить из базы',
            'Перезвонить через 10 дней',
            'Перезвонить в определенное время',
            'Перезвонить через 7 дней',
            'Перезвонить через 10 месяцев',
            'Перезвонить на следующий день, после того как он должен был подписать договор',
            'Перезвонить через 5 дней',
            'Больше не звонить, назначенна встреча'
        ],
        selectRules: [
            v => !!v || 'Обязательное поле',
        ],
        dateMeeting: null,
        whoMeeting: null,
        placeMeeting: null,
        decision: null,
        loadingBtn: false
    }),

    async mounted() {
        const id = this.$route.params.id
        this.house = await this.$store.dispatch('getHouseById', id)
        this.takenUser = await this.$store.dispatch('fetchTakenUser', this.house.user)
        Object.keys(this.takenUser.houses).find( key => {
            if( this.takenUser.houses[key].hid == this.house.id ) this.takenDate = this.takenUser.houses[key].createDate
        })
        this.currentUserId = await this.$store.dispatch('getUid')
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
        successProject() {
            let num = 0 
            Object.keys(this.takenUser.houses).forEach( key => {
                if(this.takenUser.houses[key].result == 'Выполнено') num++
            })
            return num
        },
        createDaysAgo() {
            const create = this.$moment(this.house.createDate)
            const today = this.$moment()

            let ago = today.diff(create, 'days')
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
                ago = today.diff(create, 'hour')
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
        },

        takenDaysAgo() {
            const taken = this.$moment(this.takenDate)
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
        },

        checkSelect() {
            return () => (this.select != 'Больше не звонить, назначенна встреча') || 'Обязательное поле'
        },
        checkDecision() {
            if(this.house && this.takenUser) {
                const idx = Object.keys(this.takenUser.houses).find(key => this.takenUser.houses[key].hid == this.house.id)
                if(idx && this.takenUser.houses[idx].decision) {
                    console.log('test')
                this.decision = this.takenUser.houses[idx]
                    return true
                } else return false
            }
        }
    }
}
</script>