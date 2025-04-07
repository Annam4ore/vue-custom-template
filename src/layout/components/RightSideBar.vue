<template>
    <v-navigation-drawer
      app
      right
      temporary
      :value ="localDrawerRight"
        @input="updateDrawer"
      width="400px"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>test</v-list-item-title>
              <span class="text-body-2 grey--text text--lighten-1">角色</span>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <div class="grey lighten-5 my-0">
            <v-subheader class="subtitle-2 font-weight-bold mb-2 ms-2"
              >個人資料</v-subheader
            >
            <v-list-item class="px-10 py-2">
            </v-list-item>
          </div>

          <v-divider></v-divider>
          <v-list-item class="mt-5">
            <v-list-item-content>
              <v-list-item-subtitle class="subtitle-2 font-weight-bold ms-2"
                >修改密碼</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-btn color="black" class="pa-4" dark>
              修改密碼
            </v-btn>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            localDrawerRight: this.drawerRight
        };
    },
    props: {
        drawerRight: {
            type: Boolean,
            required: true
        },
    },
    watch: {
        drawerRight(newVal) {
            console.log('drawerRight',newVal);
            this.localDrawerRight = newVal;
        }
    },
    methods: {
        updateDrawer(value) {
            this.$emit('update-drawerRight', value);
        }
    },
    mounted() {
    }
}
</script>