<template>
    <div id="auth-layout">
        <router-view />
    </div>
</template>

<script>
export default {
    
    async mounted() {
      const response = await this.$store.dispatch('checkBan')
      if( response === 'banned') {
          await this.$store.dispatch('logout')   
          this.$router.push('/auth')
      }
    }

}
</script>

<style>
#auth-layout {
    height: 100vh;
    background-image: url('../assets/auth-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>