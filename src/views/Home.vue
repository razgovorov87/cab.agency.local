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

    <v-card>
      <HouseTable />
    </v-card>

  </div>
</template>

<script>
import HouseTable from '@/components/Home/HouseTable'
export default {
  name: 'Home',
  data: () => ({
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

  components: {
    HouseTable
  }

}
</script>
