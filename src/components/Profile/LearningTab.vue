<template>
    <v-row>
        <div class="mb-5 d-flex align-center justify-center flex-column" style="width: 100%;">
            <v-btn color="primary" class="mb-4" href="https://firebasestorage.googleapis.com/v0/b/median-5546c.appspot.com/o/printsipy_partnerstva.docx?alt=media&token=e5f50b6b-2adb-46c6-8193-87ffee17c996" target="__blank"><v-icon class="mr-2">mdi-download</v-icon>Принципы партнерства</v-btn>
            <v-btn color="primary" href="https://firebasestorage.googleapis.com/v0/b/median-5546c.appspot.com/o/Vizitka.pdf?alt=media&token=352b0e23-fa0f-4efe-8978-626e2c4e8c99" target="__blank"><v-icon class="mr-2">mdi-download</v-icon>Визитка</v-btn>
        </div>
        <div class="d-flex flex-wrap">
            <div class="mx-2">
                <youtube :video-id="id1" ref="youtube" width="380" height="250"></youtube>
            </div>
            <div class="mx-2">
                <youtube :video-id="id2" ref="youtube" width="380" height="250"></youtube>
            </div>
           <div class="mx-2">
                <youtube :video-id="id3" ref="youtube" width="380" height="250"></youtube>
            </div>
           <div class="mx-2">
                <youtube :video-id="id4" ref="youtube" width="380" height="250"></youtube>
            </div>
           <div class="mx-2">
                <youtube :video-id="id5" ref="youtube" width="380" height="250"></youtube>
            </div>
        </div>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        id1: 'RtBd1OUDANU',
        id2: 'iXd7zJgAzlE',
        id3: 'cKRzZMn9E2U',
        id4: 'JeEa_PQDkBU',
        id5: 'J8LjKNwA_XM',
    }),
}
</script>
