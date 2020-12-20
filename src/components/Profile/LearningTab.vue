<template>
    <v-row>
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
