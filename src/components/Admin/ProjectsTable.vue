<template>
  <div>
      <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>
      <v-data-table v-model="houses" :headers="headers" :items="items" :key="refreshTable" group-by="status" locale="ru-RU" hide-default-footer disable-pagination>

        <template v-slot:group.header="{ group, toggle, isOpen, items }">
            <td colspan="8">
                <v-btn @click="toggle" icon>
                    <v-icon>{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
                </v-btn>
                <span v-if="group == 'В работе'">
                    <v-chip class="overline mr-2" color="warning">{{group}}</v-chip> Кол-во: {{items.length}}
                </span>
                <span v-else-if="group == 'Выполнено'">
                    <v-chip  class="overline mr-2" color="success">{{group}}</v-chip> Кол-во: {{items.length}}
                </span>
                <span v-else-if="group == 'Свободно'">
                    <v-chip class="overline mr-2" color="secondary">{{group}}</v-chip> Кол-во: {{items.length}}
                </span>
            </td>
        </template>

        <template v-slot:item="{ item }">
            <tr v-if="item.status == 'Выполнено'">
                <td>
                    <router-link :to="'/houses/' + item.id" target="__blank">{{item.info.adress}}</router-link>
                </td>
                <td><v-icon color="success">mdi-check</v-icon></td>
                <td class="caption">{{item.info.type}}</td>
                <td v-if="item.info.rentPrice">{{item.info.rentPrice | currency}}</td>
                <td v-else>
                    <v-icon color="error">mdi-close</v-icon>
                </td>
                <td v-if="item.info.salePrice">{{item.info.salePrice | currency}}</td>
                <td v-else>
                    <v-icon color="error">mdi-close</v-icon>
                </td>
                <td>{{item.info.bedrooms}}</td>
                <td>{{item.info.bethrooms}}</td>
                <td>
                    <v-btn icon x-small class="mr-1">
                        <v-icon color="warning" @click="editItem(item, item.id)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon x-small @click="deleteItem(item, item.id)">
                        <v-icon color="error">mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
            <tr v-else-if="item.status == 'В работе'">
                <td colspan="2" class="py-3">
                    <v-btn class="overline" rounded outlined color="primary" :href="item.link" target="__blank"><v-icon color="primary" class="mr-2">mdi-open-in-new</v-icon> Ссылка на объявление</v-btn>
                </td>
                <td>
                    <v-chip label color="primary" v-if="item.decision.decision == 'Перезвонить через N дней'">Перезвонить {{item.decision.daysCall | date('fullmonthDay')}} в {{item.decision.timeCall}}</v-chip>
                </td>
                <td colspan="2">Исполнитель: <router-link :to="'/users/' + item.takenUser">{{getTakenUser(item.takenUser)}}</router-link></td>
                <td colspan="2"></td>
                <td>
                    <v-btn icon x-small class="mr-1">
                        <v-icon color="warning" @click="editItem(item, item.id)">mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon x-small>
                        <v-icon color="error" @click="deleteItem(item, item.id)">mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
            <tr v-else-if="item.status == 'Свободно'">
                <td colspan="9" class="py-3">
                    <v-btn class="overline" rounded outlined color="primary"><v-icon color="primary" class="mr-2">mdi-open-in-new</v-icon> Ссылка на объявление</v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="title">Вы уверены что хотите удалить этот проект?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="deleteItemConfirm" :loading="loadingBtn">Подтвердить</v-btn>
              <v-btn color="error" text @click="dialogDelete = false">Отмена</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" persistent>
        <DialogEdit v-bind:project="editedItem" @closeDialog="dialogEdit = false" @success="refresh" :key="refreshEditDialog"/>
    </v-dialog>
    <Snackbar v-bind:options="snackbarOptions" :key="snackbarOptions"/>
  </div>
</template>

<script>
import DialogEdit from '@/components/Admin/DialogEdit'
import Snackbar from '@/components/Snackbar'
export default {
  data: () => ({
      users: [],
    headers: [
      { text: "Адрес", value: "adress" },
      { text: "Решение", value: "decision" },
      { text: "Тип", value: "type" },
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
    loading: true,
    dialogDelete: false,
    dialogEdit: false,
    loadingBtn: false,
    editedItem: null,
    editedIndex: null,
    refreshEditDialog: 0
  }),
    
  methods: {
      async refresh() {
          this.loading = true
          this.items = await this.$store.dispatch("fetchHouses")
          this.refreshTable++
          this.loading = false
      },
      editItem(item, id) {
        this.refreshEditDialog++
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = this.items[this.editedIndex]
        this.dialogEdit = true
      },
      deleteItem(item, id) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = this.items[this.editedIndex]
        this.dialogDelete = true
      },
      async deleteItemConfirm() {
        this.loadingBtn = true
        this.items.splice(this.editedIndex, 1)
        try {
            await this.$store.dispatch('deleteHouse', this.editedItem)
            this.loadingBtn = false
            this.editedIndex = -1
            this.editedItem = null
            this.dialogDelete = false
        } catch(e) {console.log(e)}
      },
      getTakenUser(id) {
        const idx = this.users.findIndex(user => user.id == id)
        return this.users[idx].info.name + ' ' + this.users[idx].info.secondName
      }
  },

  async mounted() {
    this.users = await this.$store.dispatch('fetchUsers')
    this.items = await this.$store.dispatch("fetchHouses")
    this.loading = false
  },


  components: {
      Snackbar, DialogEdit
  }
};
</script>