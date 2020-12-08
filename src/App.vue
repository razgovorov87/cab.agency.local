<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  name: 'App',

  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout'
    }
  },

  components: {
    MainLayout, AuthLayout
  }

};
</script>

<style>
header {
  border-bottom: 1px solid #e3ebf6 !important;
}
.drawer-nav .v-list-item .v-list-item__title {
  color: #a9baca !important;
  transition: .3s ease;
}

.drawer-nav .v-list-item:hover .v-list-item__title, .drawer-nav .v-list-item:hover .v-list-item__icon i {
  color: #fff !important;
}
</style>
