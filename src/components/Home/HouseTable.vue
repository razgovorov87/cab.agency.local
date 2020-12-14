<template>
  <div>
      <v-data-table v-model="houses" :headers="headers" :items="items" :key="refreshTable">

        <template v-slot:item.price="{ item }">
            <span class="overline">{{ item.price | currency }}</span>       
        </template>

        <template v-slot:item.rent="{ item }">
            <v-icon v-if="item.rent" color="success">mdi-check</v-icon>
            <v-icon v-else color="error">mdi-close</v-icon>      
        </template>

        <template v-slot:item.sale="{ item }">
            <v-icon v-if="item.sale" color="success">mdi-check</v-icon>
            <v-icon v-else color="error">mdi-close</v-icon>      
        </template>

        <template v-slot:item.status="{ item }">
            <v-chip v-if="item.status == 'Свободно'" color="success">
                {{ item.status }}
            </v-chip>
            <v-chip v-if="item.status == 'В обработке'" color="warning">
                {{ item.status }}
            </v-chip>       
        </template>

        <template v-slot:item.button="{ item }">
        <v-btn small color="primary" @click="selectHouse(item)" :disabled="item.status == 'Свободно' ? false : true">
            Взять в работу
        </v-btn>
        </template>
    </v-data-table>
    <Snackbar v-bind:options="snackbarOptions" :key="snackbarOptions"/>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar'
export default {
  data: () => ({
    headers: [
      { text: "Название", value: "title" },
      { text: "Тип", value: "type" },
      { text: "Цена", value: "price" },
      { text: "Аренда", value: "rent" },
      { text: "Продажа", value: "sale" },
      { text: "Статус", value: "status" },
      { text: "Спален", value: "bedrooms" },
      { text: "Ванных", value: "bethrooms" },
      {text: '', value: 'button'}
    ],
    items: [],
    houses: null,
    refreshTable: null,
    snackbarOptions: null
  }),

  async mounted() {
    this.items = await this.$store.dispatch("fetchHouses")
  },

  methods: {
      async selectHouse(house) {
          const uid = await this.$store.dispatch('getUid')
          const data = {
              house,
              uid,
              date: new Date().toJSON()
          }
          try {
              await this.$store.dispatch('selectHouse', data)
              const idx = this.items.findIndex(item => item.id == house.id)
              this.items[idx].status = 'В обработке'
              this.refreshTable++
              this.snackbarOptions = {
                  status: true,
                  text: 'Объект успешно добавлен в ваши проекты!',
                  color: 'success'
              }
          } catch (e) {
              console.log(e)
          }
      },
      showSnackbar(data) {

      }
  },

  components: {
      Snackbar
  }
};
</script>