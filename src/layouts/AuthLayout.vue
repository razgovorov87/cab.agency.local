<template>
    <div id="auth-layout">
        <router-view />
    </div>
</template>

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