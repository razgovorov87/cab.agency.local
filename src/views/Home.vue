<template>
  <div class="home pa-5">

    <v-card flat class="d-flex align-center mb-5">
      <div>
          <span class="title">Главная</span>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 pt-1"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn outlined small color="#244F96">
          Сегодня: {{ date | date('monthDay') }}
      </v-btn>
      <v-btn outlined small class="ml-2" color="#244F96">
          <v-icon>mdi-download-outline</v-icon>
      </v-btn>
    </v-card>

    <v-row>
      <v-col cols="8">
        <v-card>
          <HouseTable @takenHouse="showSteppers" />
        </v-card>
      </v-col>
    </v-row>

    <v-btn @click="steppersDialog = true">dialog</v-btn>

  <v-dialog v-model="steppersDialog">
    <v-card>
      <HomeSteppers />
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import HomeSteppers from '@/components/Home/HomeSteppers'
import HouseTable from '@/components/Home/HouseTable'
export default {
  name: 'Home',
  data: () => ({
    steppersDialog: false,
    breadcrumbs: [
        {
            text: 'Медиан',
            disabled: true,
        },
        {
            text: 'Главная',
            disabled: false,
            href: '/'
        },
    ],
    date: new Date()
  }),

  methods: {
    showSteppers(data) {
      console.log(data)
    }
  },

  components: {
    HouseTable,
    HomeSteppers
  }

}
</script>
