<template>
  <div id="main">
    <v-app-bar app flat color="#fff" height="57px">

      <v-btn class="title text-capitalize" text @click="$router.push('/')">
        <v-icon class="mr-2">mdi-home-outline</v-icon>
        Медиан
      </v-btn>
      
      <v-divider vertical></v-divider>

      <div v-if="isAdmin" class="d-flex">
          <v-list-item link to="/admin/projects">
            <v-list-item-icon>
              <v-icon color="#a9baca">mdi-briefcase-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Проекты</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/admin/users">
            <v-list-item-icon>
              <v-icon color="#a9baca">mdi-account-group-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Пользователи</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <!-- <v-badge v-if="notificationLength" v-model="bagdeNotification" bordered color="error" :content="notificationLength" overlap offset-x="20" offset-y="23">
        <v-menu v-model="notificationPopover" offset-y left>

          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="deleteNotification()">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>

        <v-card elevation="0" style="border: 1px solid #d9e3f1;" width="500px">
          <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="py-2 px-3 d-flex justify-space-between">
            <span class="subtitle-1">Уведомления</span>
            <v-chip color="primary" small>{{ notificationLength }}</v-chip>
          </v-card-title>
          <v-card-text>
            <v-list class="pa-0" dense>
              <v-list-item two-line class="pa-0" v-for="record of notifications" :key="record">

                <v-list-item-avatar>
                  <v-btn icon class="blue lighten-5">
                    <v-icon color="primary">{{ record.icon }}</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold ma-0">{{ record.title }}</v-list-item-title>
                  <v-list-item-subtitle class="caption">{{ record.desc }}</v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        </v-menu>
      </v-badge>

      <v-menu v-model="notificationPopover" offset-y left>

          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>

          <v-card elevation="0" style="border: 1px solid #d9e3f1;" width="500px">
            <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="py-2 px-3 d-flex justify-space-between">
              <span class="subtitle-1">Уведомления</span>
              <v-chip color="primary" small>0</v-chip>
            </v-card-title>
            <v-card-text class="d-flex justify-center align-center mt-5">
              <span class="body-2 grey--text">У вас нет новых уведомлений!</span>
            </v-card-text>
          </v-card>
        </v-menu> -->
        
        <v-divider vertical></v-divider>

        <div class="d-flex justify-space-between align-center">

          <v-btn icon @click="logout()" class="mx-2">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </div>


    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    notificationPopover: false,
    bagdeNotification: true,
    user: null,
    notifications: null 
  }),

  async mounted() {
    this.checkBan()
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchUserInfo')
    }
    this.notifications = await this.$store.dispatch('fetchNotification')
  },

  methods: {

    async checkBan() {
      const response = await this.$store.dispatch('checkBan')
      if( response === 'banned') {
          await this.$store.dispatch('logout')   
          this.$router.push('/auth')
      }
    },

    async logout() {
      try {
        await this.$store.dispatch('logout')
        this.$router.push('/auth')
      } catch (e) {
        console.log(e)
      }
    },
    
    async deleteNotification() {
      this.bagdeNotification = false
      await this.$store.dispatch('deleteNotification')
    }

  },

  computed: {
    notificationLength() {
      if(this.notifications) {
        return Object.keys(this.notifications).length
      }
    },
    isAdmin() {
      return this.$store.getters.info.isAdmin ? true : false
    }
  }
}
</script>

<style>
.v-toolbar__content {
  padding-right: 0;
}
</style>