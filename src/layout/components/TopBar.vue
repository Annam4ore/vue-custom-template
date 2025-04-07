<template>
    <v-app-bar app fixed dark style="background: linear-gradient(to left, #1e181f, #2b313e)">
        <v-app-bar-nav-icon @click="$emit('toggle-leftDrawer')" v-show="acceptItem.left"></v-app-bar-nav-icon>
        <div v-show="acceptItem.debug">
            <v-btn class="mx-1" icon @click="showDebug">
                <v-badge :color="records && records.length > 0 ? 'pink' : '#272a35'" dot>
                    <v-icon>mdi-spider</v-icon>
                </v-badge>
            </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon @click="logout">
            登出
        </v-btn>
        <!-- <v-btn class="mx-2" icon @click="$emit('toggle-rightDrawer')" v-show="acceptItem.right">
            <v-icon smal>mdi-forum</v-icon>
        </v-btn> -->
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            drawerRight: this.acceptItem.right
        };
    },
    props: {
        acceptItem: {
            type: Object,
            required: true
        },
        records: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        logout() {
            this.$emit('logout');
        },
        showDebug() {
            this.$emit('show-debug');
        },
    },
    mounted() {
    }
}
</script>