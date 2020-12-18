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

        <div class="d-flex align-center justify-center mb-3">
            <v-btn x-large color="primary" @click="takenNewProject()">Взять новый проект</v-btn>
        </div>

        <div :key="refreshHouseTab">
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

            <div v-else-if="houses && !Object.keys(houses).length" class="d-flex justify-center align-center mt-5">
                <p class="subtitle-1">У вас нет взятых проектов</p>
            </div>

            <v-row v-else>
                <HouseCard v-for="house of houses" :key="house.id" v-bind:house="house" @editHouse="editHouse"/>
            </v-row>
        </div>


        <v-dialog v-model="stepperDialog" persistent>
            <v-card>
                <ProjectStepper v-bind:house="stepperHouse" @success="refresh" @closeDialog="stepperDialog = false"/>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ProjectStepper from '@/components/Profile/ProjectStepper'
import HouseCard from '@/components/Profile/HouseCard'
export default {
    data: () => ({
        houses: null,
        stepperHouse: {},
        loading: true,
        refreshHouseTab: null,
        stepperDialog: false
    }),

    async mounted() {
        this.houses = (await this.$store.dispatch('fetchUserHouses')).reverse()

        this.loading = false
    },

    methods: {
        async takenNewProject() {
            this.stepperHouse = await this.$store.dispatch('takenNewProject')
            this.stepperDialog = true
        },
        async refresh() {
            console.log('refresh')
            this.loading = true
            this.houses = (await this.$store.dispatch('fetchUserHouses')).reverse()
            this.refreshHouseTab++
            this.stepperDialog = false
            this.loading = false
        },
        editHouse(house) {
            this.stepperHouse = house
            this.stepperDialog = true
        }
    },

    components: {
        HouseCard,
        ProjectStepper
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