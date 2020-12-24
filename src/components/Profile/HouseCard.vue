<template>
  <v-col cols="3">
    <v-card
      v-if="house.info"
      elevation="0"
      style="border: 1px solid #d9e3f1"
    >
      <div class="card-header pa-3">
        <div class="d-flex justify-space-between align-center mb-2">
          <p class="subtitle-1 primary--text ma-0">{{ house.info.type }}</p>
          <div>
            <!-- <v-chip
              small
              color="#4192F2"
              class="ml-2 white--text overline text-center"
              v-if="house.info.rentPrice"
              >Аренда</v-chip
            >
            <v-chip
              small
              color="#F74C55"
              class="ml-2 white--text overline text-center"
              v-if="house.info.salePrice"
              >Продажа</v-chip
            > -->
            <v-btn rounded color="primary" :href="house.link" target="__blank"> <v-icon>mdi-open-in-new</v-icon> </v-btn>
          </div>
        </div>
        <v-card-title class="caption pa-0">
          <div>
            <v-icon small>mdi-map-marker</v-icon>
            {{house.info.adress}}
          </div>
        </v-card-title>
        <v-btn block rounded class="mt-2 mr-2" color="primary" outlined @click="$router.push('/houses/' + house.id)">Открыть</v-btn>
      </div>
      <!-- <v-card-text class="px-3">
        <div
          style="border-bottom: 1px solid #d9e3f1"
          class="pa-2 d-flex justify-space-around"
        >
          <p v-if="house.info.bedrooms" class="house-option ma-0 subtitle-2">
            Спален: {{ house.info.bedrooms }}
          </p>
          <p v-if="house.info.bethrooms" class="house-option ma-0 subtitle-2">
            Ванных: {{ house.info.bethrooms }}
          </p>
          <p class="house-option ma-0 subtitle-2">
            м<sup>2</sup>: {{ house.info.area }}
          </p>
        </div>
        <div
          class="house-currency d-flex justify-space-around align-center mt-5 mb-3"
        >
          <div v-if="house.info.salePrice" class="currency">
            <p class="headline black--text ma-0">
              {{ house.info.salePrice | currency("RUB") }}
            </p>
            <p class="body-2 ma-0">
              {{ (house.info.salePrice / house.info.area) | currency("RUB") }} /
              м<sup>2</sup>
            </p>
          </div>
          <div v-else class="currency">
            <p class="headline black--text ma-0">
              {{ house.info.rentPrice | currency("RUB") }}
            </p>
            <p class="body-2 ma-0">в месяц</p>
          </div>
          <div class="buttons">
            <v-btn
              icon
              outlined
              color="primary"
              class="mr-2"
              :href="house.link"
              target="__blank"
            >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <v-btn icon outlined color="error" disabled>
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-text> -->
      <div
        class="house-footer grey lighten-3 pa-5 d-flex justify-space-between align-center"
      >
        <div class="house-status">
          <v-avatar
            :class="house.status == 'Выполнено' ? 'success' : 'warning'"
          >
            <v-icon color="white">
              {{
                house.status == "Выполнено" ? "mdi-check" : "mdi-clock-outline"
              }}
            </v-icon>
          </v-avatar>
          <span
            class="overline ml-2"
            :class="
              house.status == 'Выполнено' ? 'success--text' : 'warning--text'
            "
            >{{ house.status }}!</span
          >
        </div>
        <div class="status-calendar">
          <v-icon small color="grey">mdi-calendar</v-icon>
          <span class="body-2 ml-1 grey-darken-1-text">{{ getDaysAgo }}</span>
        </div>
      </div>
    </v-card>
    <v-card v-else elevation="0" style="border: 1px solid #d9e3f1">
      <div class="card-header pa-3 pb-2" style="display: table; width: 100%; box-sizing: border-box;">
        <div style="display: table-cell; padding-right: 40px;" class="pl-1">
          <v-btn @click="editHouse(house)" rounded color="secondary" outlined block>
            <v-icon class="mr-2">mdi-pencil</v-icon>
            Изменить
          </v-btn>
        </div>
        <v-btn rounded :href="house.link" color="primary" style="width: 64px; display: table-cell;" class="mr-2">
          <v-icon color="white">mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <v-card-text class="d-flex justify-space-between mt-3 pb-3">
        <v-btn block color="primary" rounded outlined>Перезвонить {{ house.decision.daysCall | date("fullmonthDay") }} в
          {{ house.decision.timeCall }}</v-btn>
      </v-card-text>
      <div
        class="house-footer grey lighten-3 pa-5 d-flex justify-space-between align-center"
      >
        <div class="house-status">
          <v-avatar
            :class="house.status == 'Выполнено' ? 'success' : 'warning'"
          >
            <v-icon color="white">
              {{
                house.status == "Выполнено" ? "mdi-check" : "mdi-clock-outline"
              }}
            </v-icon>
          </v-avatar>
          <span
            class="overline ml-2"
            :class="
              house.status == 'Выполнено' ? 'success--text' : 'warning--text'
            "
            >{{ house.status }}!</span
          >
        </div>
        <div class="status-calendar">
          <v-icon small color="grey">mdi-calendar</v-icon>
          <span class="body-2 ml-1 grey-darken-1-text">{{ getDaysAgo }}</span>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ["house"],

  methods: {
    editHouse(house) {
      this.$emit("editHouse", house);
    },
  },

  computed: {
    getDaysAgo() {
      const taken = this.$moment(this.house.takenDate);
      const today = this.$moment();

      let ago = today.diff(taken, "days");
      if (ago !== 0) {
        switch (ago) {
          case 1:
            ago = ago + " день назад";
            break;
          case 2:
          case 3:
          case 4:
            ago = ago + " дня назад";
            break;
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            ago = ago + " дней назад";
            break;
          default:
            ago = ago + " дня(ей) назад";
            break;
        }
      } else {
        ago = today.diff(taken, "hour");
        if (ago !== 0) {
          switch (ago) {
            case 1:
              ago = ago + " час назад";
              break;
            case 2:
            case 3:
            case 4:
              ago = ago + " часа назад";
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
              ago = ago + " часов назад";
              break;
            default:
              ago = ago + " час(ов) назад";
              break;
          }
        } else {
          ago = today.diff(taken, "minute");
          switch (ago) {
            case 1:
              ago = ago + " минуту назад";
              break;
            case 2:
            case 3:
            case 4:
              ago = ago + " минуты назад";
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
              ago = ago + " минут назад";
              break;
            default:
              ago = ago + " минут(ы) назад";
              break;
          }
        }
      }

      return ago;
    },
  },
};
</script>