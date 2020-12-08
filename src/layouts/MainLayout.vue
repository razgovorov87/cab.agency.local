<template>
  <div id="main">
    <v-app-bar app flat color="#fff" height="52px" :style="!drawer ? 'left: 219px;' : 'left: 56px;'">
      <v-app-bar-nav-icon>
        <v-icon @click="drawer = !drawer">mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-badge v-model="bagdeNotification" bordered color="error" content="1" overlap offset-x="20" offset-y="23">
        <v-menu v-model="notificationPopover" offset-y left>

          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </template>

        <v-card elevation="0" style="border: 1px solid #d9e3f1;" width="500px">
          <v-card-title style="border-bottom: 1px solid #d9e3f1;" class="py-2 px-3 d-flex justify-space-between">
            <span class="subtitle-1">Уведомления</span>
            <v-chip color="primary" small>1</v-chip>
          </v-card-title>
          <v-card-text>
            <v-list class="pa-0" dense>
              <v-list-item two-line class="pa-0">

                <v-list-item-avatar>
                  <v-btn icon class="blue lighten-5">
                    <v-icon color="primary">mdi-login-variant</v-icon>
                  </v-btn>
                </v-list-item-avatar>
                
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold ma-0">Вы успешно зарегистрировались!</v-list-item-title>
                  <v-list-item-subtitle class="caption">Чтобы приступить к работе, вам необходимо пройти обучение</v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        </v-menu>
      </v-badge>


    </v-app-bar>
    <v-navigation-drawer
      :mini-variant="drawer"
      width="219px"
      color="#244F96"
      dark
      app
      class="pb-3"
    >
      <v-list dense nav class="drawer-nav">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon color="#a9baca">mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon small color="#a9baca">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-list-item link to="/profile">
          <v-list-item-icon>
            <v-icon color="#a9baca">mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Мой профиль</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon small color="#a9baca">mdi-chevron-right</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="d-flex justify-space-between align-center" :class="!drawer ? 'px-5' : 'px-1'">
          <v-avatar>
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" />
          </v-avatar>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main  :style="!drawer ? 'padding-left: 219px;' : 'padding-left: 56px;'">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    notificationPopover: true,
    bagdeNotification: true
  }),
}
</script>