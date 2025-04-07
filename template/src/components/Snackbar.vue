<template>
    <div>
        <v-snackbar v-model="visible" :color="bgColor" class="snackbar-area">
            {{ msg }}
            <template v-slot:action="{ attrs }" v-if="showClose">
                <v-btn text :color="colors" @click="close">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState({
            bgColor: state => state.snackbar.bgColor,
            colors: state => state.snackbar.color,
            msg: state => state.snackbar.msg,
            visible: state => state.snackbar.visible,
            showClose: state => state.snackbar.showClose
        }),
    },
    methods: {
        close() {
            this.$store.commit("snackbar/close_snackbar");
        }
    }
}
</script>
<style>
.snackbar-area {
    position: fixed;
    top: 6px;
    transform: translate(0%, -90%);
    margin: 0 auto;
}
</style>