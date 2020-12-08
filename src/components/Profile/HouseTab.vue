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

        <v-row>
            <HouseCard />
            <HouseCard />
            <HouseCard />
            <HouseCard />
        </v-row>
    </div>
</template>

<script>
import HouseCard from '@/components/Profile/HouseCard'
export default {
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