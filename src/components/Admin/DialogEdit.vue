<template>
  <v-card class="pa-5" v-if="project">
    <v-row>
      <v-col cols="7">
        <v-form ref="formInfo" :disabled="this.checkDisable">
          <v-row>
            <v-col cols="4" class="pt-0">
              <span class="overline">Адрес</span>
              <v-text-field
                outlined
                dense
                v-model="adress"
                :rules="adressRules"
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="4" class="pt-0">
              <span class="overline">Телефон</span>
              <v-text-field
                outlined
                dense
                v-model="phone"
                :rules="phoneRules"
                v-mask="'+7 (###) ###-##-##'"
                required
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="4" class="pt-0">
              <span class="overline">Тип</span>
              <v-select
                outlined
                dense
                v-model="type"
                :rules="typeRules"
                :items="typeItems"
                required
                hide-details
              ></v-select>
            </v-col>

            <v-col cols="4">
              <span class="overline">Площадь</span>
              <v-text-field
                outlined
                dense
                v-model="area"
                :rules="areaRules"
                type="number"
                required
                hide-details
              >
                <template v-slot:append>
                  <span class="mt-1 pa-0">м<sup>2</sup></span>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="4">
              <span class="overline">Кол-во спальных комнат</span>
              <v-text-field
                v-model="bedrooms"
                type="number"
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <span class="overline">Кол-во ванных комнат</span>
              <v-text-field
                v-model="bethrooms"
                type="number"
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="4" offset="2">
              <span class="overline">Цена продажи</span>
              <v-text-field
                v-model="sale"
                :rules="[priceVerify]"
                outlined
                type="number"
                dense
              >
              </v-text-field>
            </v-col>

            <v-col cols="4">
              <span class="overline">Цена аренды</span>
              <v-text-field
                v-model="rent"
                :rules="[priceVerify]"
                outlined
                type="number"
                dense
              >
                <template v-slot:append>
                  <span class="mt-1">в месяц</span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
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
            <v-checkbox v-model="sofa" label="Диван" class="mr-3"></v-checkbox>
            <v-checkbox v-model="WiFi" label="Wi-Fi" class="mr-3"></v-checkbox>
            <v-checkbox
              v-model="hob"
              label="Газ.плита/Вароч.поверхность"
              class="mr-3"
            ></v-checkbox>
          </div>
        </v-form>
      </v-col>
      <v-divider class="mx-2" vertical></v-divider>
      <v-col cols="4">
        <v-form ref="decisionForm" style="min-width: 100%">
          <span class="overline">Выберите нужный вариант</span>
          <v-select
            v-model="select"
            :items="selectItems"
            :rules="selectRules"
            required
            outlined
            dense
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
          <span class="overline">Комментарий</span>
          <v-textarea v-model="comment" outlined></v-textarea>
        </v-form>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-5 px-5">
      <v-btn
        color="primary"
        class="mr-2"
        @click="saveHouseFullInfo()"
        :loading="loadingBtn"
        >Сохранить</v-btn
      >
      <v-btn color="error" @click="closeDialog">Отмена</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["project"],
  data: () => ({
    adress: "",
    adressRules: [(v) => !!v || "Обязательное поле"],
    phone: "",
    phoneRules: [(v) => !!v || "Обязательное поле"],
    type: "",
    typeItems: ["Квартира", "Частный дом", "Гараж"],
    typeRules: [(v) => !!v || "Обязательное поле"],
    area: "",
    areaRules: [(v) => !!v || "Обязательное поле"],
    bedrooms: "",
    bethrooms: "",
    sale: "",
    rent: "",
    select: "",
    selectItems: [
      "Больше не звонить и удалить из базы",
      "Перезвонить через N дней",
      "Больше не звонить, назначенна встреча",
    ],
    selectRules: [(v) => !!v || "Обязательное поле"],
    dateMeeting: "",
    whoMeeting: "",
    placeMeeting: "",
    daysCall: "",
    timeCall: "",
    comment: "",
    loadingBtn: false,
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
  }),

  mounted() {
    if(this.project.info) {
        this.adress = this.project.info.adress;
        this.phone = this.project.info.phone;
        this.type = this.project.info.type;
        this.area = this.project.info.area;
        this.bedrooms = this.project.info.bedrooms;
        this.bethrooms = this.project.info.bethrooms;
        this.sale = this.project.info.salePrice;
        this.rent = this.project.info.rentPrice;
        this.airConditioning = this.project.info.features.airConditioning,
        this.alarmSystem = this.project.info.features.alarmSystem,
        this.kidsCourt = this.project.info.features.kidsCourt,
        this.refrigerator = this.project.info.features.refrigerator,
        this.pool = this.project.info.features.pool,
        this.TVCable = this.project.info.features.TVCable,
        this.washer = this.project.info.features.washer,
        this.dishWasher = this.project.info.features.dishWasher,
        this.sofa = this.project.info.features.sofa,
        this.WiFi = this.project.info.features.WiFi,
        this.hob = this.project.info.features.hob;
    }

    this.select = this.project.decision.decision;
    this.daysCall = this.project.decision.daysCall;
    this.timeCall = this.project.decision.timeCall;
    this.dateMeeting = this.project.decision.dateMeeting;
    this.whoMeeting = this.project.decision.whoMeeting;
    this.placeMeeting = this.project.decision.placeMeeting;
    this.comment = this.project.decision.comment;
  },

  methods: {
    closeDialog() {
      this.adress = "";
      this.phone = "";
      this.type = "";
      this.area = "";
      this.bedrooms = "";
      this.bethrooms = "";
      this.sale = "";
      this.rent = "";
      this.select = "";
      this.daysCall = "";
      this.timeCall = "";
      this.dateMeeting = "";
      this.whoMeeting = "";
      this.placeMeeting = "";
      this.comment = "";
      this.airConditioning = "",
      this.alarmSystem = "",
      this.kidsCourt = "",
      this.refrigerator = "",
      this.pool = "",
      this.TVCable = "",
      this.washer = "",
      this.dishWasher = "",
      this.sofa = "",
      this.WiFi = "",
      this.hob = "";
      this.$emit("closeDialog");
    },

    async saveHouseFullInfo() {
      if( (this.$refs.formInfo.validate() || this.checkDisable) && this.$refs.decisionForm.validate()) {
        this.loadingBtn = true;
        const info = {
            id: this.project.id,
            adress: this.adress ? this.adress : null,
            phone: this.phone ? this.phone : null,
            type: this.type ? this.type : null,
            area: this.area ? this.area : null,
            bedrooms: this.bedrooms ? this.bedrooms : null,
            bethrooms: this.bethrooms ? this.bethrooms : null,
            rentPrice: this.rent ? this.rent : null,
            salePrice: this.sale ? this.sale : null,
            features: {
                airConditioning: this.airConditioning ? this.airConditioning : null,
                alarmSystem: this.alarmSystem ? this.alarmSystem : null,
                kidsCourt: this.kidsCourt ? this.kidsCourt : null,
                refrigerator: this.refrigerator ? this.refrigerator : null,
                pool: this.pool ? this.pool : null,
                TVCable: this.TVCable ? this.TVCable : null,
                washer: this.washer ? this.washer : null,
                dishWasher: this.dishWasher ? this.dishWasher : null,
                sofa: this.sofa ? this.sofa : null,
                WiFi: this.WiFi ? this.WiFi : null,
                hob: this.hob ? this.hob : null,
            },
        };

        const decision = {
            decision: this.select ? this.select : null,
            daysCall: this.daysCall ? this.daysCall : null,
            timeCall: this.timeCall ? this.timeCall : null,
            dateMeeting: this.dateMeeting ? this.dateMeeting : null,
            whoMeeting: this.whoMeeting ? this.whoMeeting : null,
            placeMeeting: this.placeMeeting ? this.placeMeeting : null,
            comment: this.comment ? this.comment : null,
        };

        try {
            await this.$store.dispatch("saveHouseFullInfo", { info, decision, checkDisable: this.checkDisable});
            this.closeDialog();
            this.$emit("success");
        } catch (e) {
            console.log(e);
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
        (this.select == "Перезвонить через N дней" &&
          this.daysCall != "" &&
          this.timeCall != "") ||
        "Обязательное поле";
    },
    checkDisable() {
      if (this.select == "Больше не звонить, назначенна встреча") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>