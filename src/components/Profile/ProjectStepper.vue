<template>
  <v-stepper v-model="stepper" v-if="house">
    <v-stepper-header elevation="0">
      <v-stepper-step :complete="stepper > 1" step="1">
        Получение ссылки
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepper > 2" step="2">
        Решение
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="stepper > 3" step="3">
        Заполнение информации
      </v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1" class="pa-5">
        <v-card
          class="d-flex flex-column justify-center"
          height="400px"
          elevation="0"
        >
          <div class="get-link d-flex flex-column align-center">
            <p class="ma-0 body-2">Вы успешно взяли новый проект в работу!</p>
            <p class="ma-0 subtitle-2 text-center" style="max-width: 600px">
              Далее, вам необходимо перейти по ссылке ниже, связаться с
              продавцом и заполнить всю информацию о проекте, а так же вынести
              решение.
            </p>
            <a class="display-1 my-5" :href="house.link" target="__blank">{{
              house.link.slice(0, 53) + "..."
            }}</a>
          </div>
        </v-card>
        <div class="d-flex justify-end">
          <v-btn class="mr-3" color="primary" @click="stepper = 2">Далее</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2" class="pa-5">
        <v-card
          class="d-flex flex-column justify-center"
          min-height="400px"
          elevation="0"
        >
          <div class="get-link d-flex flex-column align-center">
            <div style="min-width: 500px">
              <v-form ref="decisionform">
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
                    type="date"
                    outlined
                    dense
                    placeholder="Когда перезвонить?"
                  ></v-text-field>
                  <v-text-field
                    v-model="timeCall"
                    :rules="[checkDays]"
                    type="time"
                    outlined
                    dense
                    placeholder="Когда перезвонить?"
                  ></v-text-field>
                </div>
                <div v-if="select == 'Больше не звонить, назначенна встреча'">
                  <v-text-field
                    v-model="dateMeeting"
                    :rules="[checkSelect]"
                    outlined
                    dense
                    type="date"
                    placeholder="Дата встречи"
                  ></v-text-field>
                  <v-text-field
                    v-model="whoMeeting"
                    :rules="[checkSelect]"
                    dense
                    outlined
                    placeholder="С кем назначенна встреча"
                  ></v-text-field>
                  <v-text-field
                    v-model="placeMeeting"
                    :rules="[checkSelect]"
                    dense
                    outlined
                    placeholder="Место встречи"
                  ></v-text-field>
                </div>
                <v-textarea
                  v-model="comment"
                  outlined
                  placeholder="Комментарий"
                ></v-textarea>
              </v-form>
            </div>
            <span class="caption"
              >Решение можно будет поменять на странице проекта в вашем
              профиле</span
            >
          </div>
        </v-card>

        <div class="d-flex justify-end">
          <v-btn class="mr-3" color="primary" @click="saveDecision()">Отправить</v-btn>
          <v-btn color="error" @click="closeDialog">Отмена</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="3" class="pa-5">
        <v-card height="400px" elevation="0">
          <v-form ref="addnewprojectform">
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  v-mask="'+7 (###) ###-##-##'"
                  required
                  hide-details
                  outlined
                  dense
                  placeholder="Телефон продавца"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="type"
                  :rules="typeRules"
                  :items="typeItems"
                  required
                  outlined
                  hide-details
                  dense
                  placeholder="Выберите тип проекта"
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="adress"
                  :rules="adressRules"
                  required
                  hide-details
                  outlined
                  dense
                  placeholder="Адрес"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="area"
                  :rules="areaRules"
                  type="number"
                  required
                  outlined
                  hide-details
                  dense
                  placeholder="Площадь"
                >
                  <template v-slot:append>
                    <span class="mt-1 pa-0">м<sup>2</sup></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="bedrooms"
                  type="number"
                  hide-details
                  outlined
                  dense
                  placeholder="Кол-во спальных комнат"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="bethrooms"
                  type="number"
                  hide-details
                  outlined
                  dense
                  placeholder="Кол-во ванных комнат"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="sale"
                  :rules="[priceVerify]"
                  outlined
                  type="number"
                  dense
                  placeholder="Цена продажи"
                >
                </v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="rent"
                  :rules="[priceVerify]"
                  type="number"
                  suffix="в месяц"
                  outlined
                  dense
                  placeholder="Цена аренды"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <span class="title pl-5"
              >Особенности <v-icon>mdi-chevron-down</v-icon></span
            >
            <div class="d-flex flex-wrap">
              <v-checkbox
                v-model="airConditioning"
                label="Кондиционер"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="alarmSystem"
                label="Система безопасности"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="kidsCourt"
                label="Детская площадка"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="refrigerator"
                label="Холодильник"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="pool"
                label="Бассейн"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="TVCable"
                label="Кабельное телевидение"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="washer"
                label="Стиральная машина"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="dishWasher"
                label="Посудомоечная машина"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="sofa"
                label="Диван"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="WiFi"
                label="Wi-Fi"
                class="mr-3"
              ></v-checkbox>
              <v-checkbox
                v-model="hob"
                label="Газ.плита/Вароч.поверхность"
                class="mr-3"
              ></v-checkbox>
            </div>
          </v-form>
        </v-card>
        <div class="d-flex justify-end align-center">
          <span class="caption mr-3 grey--text">Если вы не готовы сейчас заполнить информацию по квартире, вернитесь на шаг назад и поставьте старое решение</span>
          <v-btn
            class="mr-3"
            color="primary"
            @click="verifyForm"
            :loading="loadingBtn"
            >Отправить</v-btn
          >
          <v-btn color="error" @click="stepper = 2">Назад</v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  props: ["house"],
  data: () => ({
    stepper: 1,
    type: null,
    typeItems: ["Квартира", "Частный дом", "Гараж"],
    typeRules: [(v) => !!v || "Обязательное поле"],
    adress: null,
    adressRules: [(v) => !!v || "Обязательное поле"],
    photo: null,
    photoRules: [(v) => !!v || "Обязательное поле"],
    bedrooms: null,
    bedroomsRules: [(v) => !!v || "Обязательное поле"],
    bethrooms: null,
    bethroomsRules: [(v) => !!v || "Обязательное поле"],
    area: null,
    areaRules: [(v) => !!v || "Обязательное поле"],
    phone: null,
    phoneRules: [(v) => !!v || "Обязательное поле"],
    sale: "",
    rent: "",
    airConditioning: false,
    alarmSystem: false,
    kidsCourt: false,
    refrigerator: false,
    pool: false,
    TVCable: false,
    washer: false,
    dishWasher: false,
    sofa: false,
    WiFi: false,
    hob: false,
    select: "Перезвонить через N дней",
    selectItems: [
     'Cсылка не актуальна',
      'Это агент',
      'Квартира сдана/продана',
      'Больше не звонить и удалить из базы',
      'Перезвонить через N дней',
      'Больше не звонить, назначенна встреча'
    ],
    selectRules: [(v) => !!v || "Обязательное поле"],
    dateMeeting: '',
    whoMeeting: '',
    placeMeeting: '',
    daysCall: '',
    timeCall: '',
    comment: '',
    loadingBtn: false,
  }),

  methods: {
    closeDialog() {
      this.$emit('closeDialog')
      this.stepper = 1
    },

    async verifyForm() {
      if (this.$refs.addnewprojectform.validate()) {
        this.loadingBtn = true;
        const formData = {
          id: this.house.id,
          link: this.house.link,
          phone: this.phone,
          type: this.type,
          adress: this.adress,
          area: this.area,
          bedrooms: this.bedrooms,
          bethrooms: this.bethrooms,
          salePrice: this.sale,
          rentPrice: this.rent,
          features: {
            airConditioning: this.airConditioning,
            alarmSystem: this.alarmSystem,
            kidsCourt: this.kidsCourt,
            refrigerator: this.refrigerator,
            pool: this.pool,
            TVCable: this.TVCable,
            washer: this.washer,
            dishWasher: this.dishWasher,
            sofa: this.sofa,
            WiFi: this.WiFi,
            hob: this.hob,
          },
        }
        

        await this.$store.dispatch('saveHouseInfo', formData)
        this.loadingBtn = false
        this.$emit("success")
        

      }
    },

    async saveDecision() {
      if (this.$refs.decisionform.validate()) {



        if(this.select != 'Больше не звонить, назначенна встреча' || this.select != 'Перезвонить через N дней') {

          const info = {
            id: this.house.id,
            decision: this.select,
            comment: this.comment
          }
          try {
            await this.$store.dispatch('archiveHouse', info)
            this.$emit("success");
          } catch (e) {
            console.log(e)
          }

        } else {

          this.loadingBtn = true;
        
          const decision = {
            id: this.house.id,
            decision: this.select,
            daysCall: this.daysCall,
            timeCall: this.timeCall,
            dateMeeting: this.dateMeeting,
            whoMeeting: this.whoMeeting,
            placeMeeting: this.placeMeeting,
            comment: this.comment,
          };

          try {
            await this.$store.dispatch("saveDecision", decision);
            if( decision.decision == 'Больше не звонить, назначенна встреча' ) {
              this.stepper = 3;
              this.loadingBtn = false;
            } else {
              this.loadingBtn = false;
              this.$emit("success");
            }
          } catch (e) {
            console.log(e);
          }

        }




      }
    },
  },

  computed: {
    priceVerify() {
      return () =>
        this.sale !== "" ||
        this.rent !== "" ||
        "Необходимо ввести хотя бы одну цену";
    },

    checkSelect() {
      return () =>
        (this.select == "Больше не звонить, назначенна встреча" &&
          (this.dateMeeting != "" ||
            this.placeMeeting != "" ||
            this.whoMeeting != "")) ||
        "Обязательное поле";
    },
    checkDays() {
      return () =>
        (this.select == "Перезвонить через N дней" && this.daysCall != "" && this.timeCall != "") ||
        "Обязательное поле";
    },
  },
};
</script>