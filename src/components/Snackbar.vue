<template>
    <v-snackbar
        v-if="options"
        v-model="options.status"
        :color="options.color"
        bottom
        right
        class="d-flex"
    >
        <div class="d-flex justify-between items-center">
            <span>{{options.text}}</span>
            <v-btn v-if="options.type === 'emailVerifed' && options.type" class="ml-4">
                Подтвердить
            </v-btn>
        </div>
        
    </v-snackbar>
</template>

<script>
export default {
    props: ['options'],
}
</script>