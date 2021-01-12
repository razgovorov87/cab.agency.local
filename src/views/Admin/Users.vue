<template>
    
  <v-skeleton-loader type="table" v-if="loading"></v-skeleton-loader>
  <div v-else class="home pa-5">
    
    <v-card  flat class="d-flex align-center mb-5">
      <div>
          <span class="title">Пользователи</span>
          <v-breadcrumbs :items="breadcrumbs" class="pa-0 pt-1"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn outlined small color="#244F96">
          Сегодня: {{ date | date('monthDay') }}
      </v-btn>
    </v-card>

    <v-card>
        <v-data-table :headers="headers" :items="users">

            <template v-slot:item.profile="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn icon color="primary" @click="$router.push(`/users/${item.id}`)" v-on="on">
                            <v-icon>mdi-account-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Профиль</span>
                </v-tooltip>
            </template>

            <template v-slot:item.passport="{ item }">
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn icon color="primary" v-on="on" @click="openPassportDialog(item)" :disabled="!item.info.passport">
                            <v-icon>mdi-book-open-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Паспорт</span>
                </v-tooltip>
            </template>

            <template v-slot:item.info.regDate="{ item }">
                <span v-if="item.info.regDate">{{ item.info.regDate | date('fullmonthDayPlusTime') }}</span>
            </template>

            <template v-slot:item.info.verify="{ item }">
                <v-icon v-if="item.info.verify" color="success">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
            </template>

            <template v-slot:item.info.isAdmin="{ item }">
                <v-icon v-if="item.info.isAdmin" color="success">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-tooltip left>
                    <template v-slot:activator="{ on }"> 
                        <v-btn icon v-on="on">
                            <v-hover v-slot="{ hover }">
                                <v-icon :color="hover ? 'error' : ''">mdi-account-cancel</v-icon>
                            </v-hover>
                        </v-btn>
                    </template>
                    <span>Заблокировать</span>
                </v-tooltip>
            </template>
        </v-data-table>

        <v-dialog v-model="passportDialog" v-if="selectableUser">
            <v-card>
                <v-card-title>
                    Паспорта пользователя: <v-chip class="ml-2">{{selectableUser.info.name + ' ' + selectableUser.info.secondName}}</v-chip>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="passportDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-img :src="selectableUser.info.passport.passportFront"></v-img>
                        </v-col>
                        <v-col cols="6">
                            <v-img :src="selectableUser.info.passport.passportTwo"></v-img>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-card>

  </div>
</template>

<script>
export default {
    data: () => ({
        headers: [
            {text: '', value: 'profile', sortable: false},
            {text: '', value: 'passport', sortable: false},
            {text: 'Имя', value: 'info.name'},
            {text: 'Фамилия', value: 'info.secondName'},
            {text: 'Город', value: 'info.city'},
            {text: 'Email', value: 'info.email', sortable: false},
            {text: 'Телефон', value: 'info.phone', sortable: false},
            {text: 'Дата регистрации', value: 'info.regDate'},
            {text: 'Подтвержден?', value: 'info.verify'},
            {text: 'Права администратора?', value: 'info.isAdmin'},
            {text: '', value: 'actions'},
        ],
        breadcrumbs: [
            {
                text: 'Медиан',
                disabled: true,
            },
            {
                text: 'Панель администратора',
                disabled: true,
            },
            {
                text: 'Пользователи',
                disabled: false,
                href: '/admin/users'
            },
        ],
        date: new Date(),
        loading: true,
        users: [],
        passportDialog: false,
        selectableUser: null
  }),

  methods: {
      openPassportDialog(user) {
          this.selectableUser = user
          this.passportDialog = true
      }
  },

  async mounted() {
      this.users = await this.$store.dispatch('fetchUsers')
      this.loading = false
  }
}
</script>