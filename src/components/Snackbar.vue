<template>
    <v-snackbar
        v-if="options"
        v-model="options.status"
        :color="options.color"
        bottom
        right
    >
    {{options.text}}
    </v-snackbar>
</template>

<script>
export default {
    props: ['options'],
}
</script>