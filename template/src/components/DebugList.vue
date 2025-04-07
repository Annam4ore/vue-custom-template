<template>
    <div>
        <v-dialog v-model="showDebug" scrollable transition="dialog-top-transition" max-width="1000px" persistent>
            <v-card>
                <div class="d-flex align-center">
                    <v-card-title class="font-weight-bold grey--text text--darken-1">錯誤紀錄</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn class="mx-4" icon @click="updateShowDebug">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
                <v-divider></v-divider>
                <v-card-text style="height: 900px;">
                    <br>
                    <v-data-table :headers="recordsHeader" :items="records"
                        :footer-props="{ 'items-per-page-text': '每頁顯示行數' }" loading-text="loading...">
                        <template slot="no-data">
                            <div>目前無資料</div>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            localShowDebug: this.showDebug,
            recordsHeader: [
                { text: '錯誤碼', value: 'errorCode' },
                { text: '類型', value: 'type' },
                { text: '訊息', value: 'msg' },
                { text: '內容', value: 'info' },
                { text: '路由', value: 'router' },
                { text: '時間', value: 'createTime' },
            ],
        };
    },
    props: {
        showDebug: {
            type: Boolean,
            required: true
        },
    },
    computed: {
        ...mapState({
            records: (state) => state.errorLog.logs
        }),
    },
    watch: {
        showDebug(newVal) {
            this.localShowDebug = newVal;
        }
    },
    methods: {
        updateShowDebug() {
            this.$emit('update-debug', false);
        }
    },
    mounted() {
    }
}
</script>