<template>
    <div>
        <v-form ref="addnewprojectform">
            <v-row>
                <v-col cols="3">
                    <v-text-field
                        v-model="link"
                        :rules="linkRules"
                        required
                        outlined
                        dense
                        placeholder="Ссылка на объявление"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="title"
                        :rules="titleRules"
                        required
                        outlined
                        dense
                        placeholder="Название проекта"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-select
                        v-model="type"
                        :rules="typeRules"
                        :items="typeItems"
                        required
                        outlined
                        dense
                        placeholder="Выберите тип проекта"
                    ></v-select>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="adress"
                        :rules="adressRules"
                        required
                        outlined
                        dense
                        placeholder="Адресс"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="photo"
                        :rules="photoRules"
                        required
                        outlined
                        dense
                        placeholder="Ссылка на фото"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="bedrooms"
                        :rules="bedroomsRules"
                        type="number"
                        required
                        outlined
                        dense
                        placeholder="Кол-во спальных комнат"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="bethrooms"
                        :rules="bethroomsRules"
                        type="number"
                        required
                        outlined
                        dense
                        placeholder="Кол-во ванных комнат"
                    ></v-text-field>
                </v-col>
                 <v-col cols="3">
                    <v-text-field
                        v-model="area"
                        :rules="areaRules"
                        type="number"
                        required
                        outlined
                        dense
                        placeholder="Площадь"
                    >
                    <template v-slot:append>
                        <span class="mt-1 pa-0">м<sup>2</sup></span>
                    </template>
                    </v-text-field>
                </v-col>
                <v-col cols="3" offset="1">
                    <v-text-field
                        v-model="phone"
                        :rules="phoneRules"
                        v-mask="'+7 (###) ###-##-##'"
                        required
                        outlined
                        dense
                        placeholder="Телефон продавца"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="sale"
                        :rules="[priceVerify]"
                        outlined
                        type="number"
                        dense
                        placeholder="Цена продажи"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                        v-model="rent"
                        :rules="[priceVerify]"
                        type="number"
                        suffix="в месяц"
                        outlined
                        dense
                        placeholder="Цена аренды"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <span class="title pl-5">Особенности <v-icon>mdi-chevron-down</v-icon></span>
            <v-row>
                <v-col cols="2">
                    <v-checkbox v-model="ariConditioning" label="Кондиционер"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="alarmSystem" label="Система безопасности"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="kidsCourt" label="Детская площадка"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="refrigerator" label="Холодильник"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="pool" label="Бассейн"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="tvCable" label="Кабельное телевидение"></v-checkbox>
                </v-col>
                <v-col cols="2" offset="1"> 
                    <v-checkbox v-model="WiFi" label="Wi-Fi"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="washer" label="Стиральная машина"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="dishwasher" label="Посудомоечная машина"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="stove" label="Газ.плита/Вароч.поверхность"></v-checkbox>
                </v-col>
                <v-col cols="2">
                    <v-checkbox v-model="sofa" label="Диван"></v-checkbox>
                </v-col>
            </v-row>
            <div class="d-flex justify-end">
                <v-btn color="primary" class="mr-2" @click="createNewHouse()">Добавить проект</v-btn>
                <v-btn color="error" @click="closeDialog()">Отмена</v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
export default {
    data: () => ({
        link: null,
        linkRules: [
            v => !!v || 'Обязательное поле',
        ],
        title: null,
        titleRules: [
            v => !!v || 'Обязательное поле',
        ],
        type: null,
        typeItems: ['Квартира', 'Частный дом', 'Гараж'],
        typeRules: [
            v => !!v || 'Обязательное поле',
        ],
        adress: null,
        adressRules: [
            v => !!v || 'Обязательное поле',
        ],
        photo: null,
        photoRules: [
            v => !!v || 'Обязательное поле',
        ],
        bedrooms: null,
        bedroomsRules: [
            v => !!v || 'Обязательное поле',
        ],
        bethrooms: null,
        bethroomsRules: [
            v => !!v || 'Обязательное поле',
        ],
        area: null,
        areaRules: [
            v => !!v || 'Обязательное поле',
        ],
        phone: null,
        phoneRules: [
            v => !!v || 'Обязательное поле',
        ],
        sale: null,
    }),

    methods: {
        closeDialog() {
            this.$emit('closeDialog')
        }
    },


    computed: {
        priceVerify() {
            return () => (this.rent !== '' || this.sale !== '') || 'Необходимо ввести хотя бы одну ценну'
        },
    }
}
</script>

