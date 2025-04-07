<template>
    <v-navigation-drawer app dark style="background: linear-gradient(to bottom, #1e181f, #2b313e)"   :value="localDrawerLeft"
        @input="updateDrawer"
        width="230px">
        <v-list-item class="my-3 text-h5">
            TEST
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav class="mt-2">
            <div v-for="(item, i) in navbar" :key="i">
                <v-list-item v-if="!item.items" :to="item.to" class="my-2">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
                <v-list-group v-else :key="item.title" no-action :value="false">
                    <template v-slot:activator>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </template>
                    <v-list-item v-for="(sub, index) in item.items" :to="sub.to" :key="sub.text">
                        <v-list-item-title>{{ sub.subtitle }}</v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </div>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            localDrawerLeft: this.drawerLeft
        };
    },
    props: {
        drawerLeft: {
            type: Boolean,
            required: true
        },
        navbar: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        drawerLeft(newVal) {
            this.localDrawerLeft = newVal;
        }
    },
    methods: {
        updateDrawer(value) {
            this.$emit('update-drawerLeft', value);
        }
    },
}
</script>