<template>
  <div>
      <v-data-table v-model="houses" :headers="headers" :items="items" :key="refreshTable">

        <template v-slot:item.link="{ item }">
            <a :href="item.link" target="__blank">{{item.link}}</a>
        </template>

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
      { text: "Ссылка на объявление", value: "link"},
      { text: "Статус", value: "status", align: 'center'},
      {text: '', value: 'button', align: 'end'}
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
              this.$emit('takenHouse', data)
          } catch (e) {
              console.log(e)
          }
      },
  },

  components: {
      Snackbar
  }
};
</script>