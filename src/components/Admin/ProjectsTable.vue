<template>
  <div>
      <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>
      <v-data-table v-else-if="items.length != 0" v-model="houses" :headers="headers" :items="items" :key="refreshTable">
          
        <template v-slot:top>
            <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-dialog v-model="addNewProjectDialog">
                    <template v-slot:activator="{ on }">
                        <v-btn outlined color="primary" v-on="on"><v-icon class="mr-2">mdi-plus</v-icon> Добавить новый</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>Добавление нового проекта</v-card-title>
                        <v-card-text>
                            <AddNewProjectForm  v-on:closeDialog="addNewProjectDialog = false"/>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-toolbar>
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

        <template v-slot:item.actions="{ item }">
            <v-btn icon small>
                <v-icon color="warning" small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small>
                <v-icon color="error" small>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <Snackbar v-bind:options="snackbarOptions" :key="snackbarOptions"/>
  </div>
</template>

<script>
import AddNewProjectForm from '@/components/Admin/AddNewProjectForm.vue'
import Snackbar from '@/components/Snackbar'
export default {
  data: () => ({
    headers: [
      { text: "Название", value: "title" },
      { text: "Тип", value: "type" },
      { text: "Цена(продажа)", value: "price" },
      { text: "Аренда", value: "rent" },
      { text: "Продажа", value: "sale" },
      { text: "Статус", value: "status" },
      { text: "Спален", value: "bedrooms" },
      { text: "Ванных", value: "bethrooms" },
      { text: "", value: "actions" },
    ],
    items: [],
    houses: null,
    refreshTable: null,
    snackbarOptions: null,
    addNewProjectDialog: false,
    loading: true
  }),

  async created() {
    console.log(this.items.length)
    this.items = await this.$store.dispatch("fetchHouses")
    this.loading = false
  },

  methods: {

  },

  components: {
      Snackbar, AddNewProjectForm
  }
};
</script>