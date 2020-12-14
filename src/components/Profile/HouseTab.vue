<template>
    <div class="house-tab">
        <v-row>
            <v-col cols="11">
                <v-form class="d-flex align-center" id="house-search">
                    <v-text-field 
                        solo 
                        dense 
                        elevation="0"
                        placeholder="Поиск"
                    >
                    </v-text-field>
                </v-form>
            </v-col>
            <v-col cols="1">
                <v-btn  color="blue lighten-3">
                    <v-icon color="primary">mdi-filter</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row v-if="loading">
            <v-col cols="3">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="3">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="3">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="3">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else>
            <HouseCard v-for="house of houses" :key="house.id" v-bind:house="house"/>
        </v-row>
    </div>
</template>

<script>
import HouseCard from '@/components/Profile/HouseCard'
export default {
    data: () => ({
        houses: null,
        loading: true
    }),

    async mounted() {
        this.houses = await this.$store.dispatch('fetchUserHouses')
        const result = await this.$store.dispatch('fetchHouseResult')
        this.houses.forEach( (house, idx) => {
            result.forEach(item => {
                if(house.id == item.hid) {
                    this.houses[idx] = {
                        ...house,
                        result: item.result,
                        takenDate: item.createDate
                    }
                }
            })
        })

        this.loading = false
    },

    components: {
        HouseCard
    }
}
</script>

<style>
#house-search .v-input__append-outer {
    margin: 0 !important;
}
#house-search .search-btn {
    border-radius: 0 7px 7px 0 !important;
}
</style>