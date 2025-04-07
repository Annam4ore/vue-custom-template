<template>
  <v-app style="background-color: #f0f2f7">
    <TopBar
      :accept-item="acceptItem"
      :records="records"
      @toggle-leftDrawer="toggleLeftDrawer"
      @show-debug="toggleDebug"
      @toggle-rightDrawer="toggleRightDrawer"
      @logout="logout"
    />
    <LeftSidebar
      :drawer-left="drawerLeft"
      :navbar="navbar"
      @update-drawerLeft="updateDrawerLeft"
    />
    <RightSidebar
      :drawer-right="drawerRight"
      @update-drawerRight="updateDrawerRight"
    />
    <debug :show-debug="showDebug" @update-debug="updateDebug"></debug>
    <v-main>
      <router-view />
      <Snackbar></Snackbar>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import LeftSidebar from "./components/LeftSideBar.vue";
import RightSidebar from "./components/RightSideBar.vue";
import Snackbar from "@/components/Snackbar.vue";
import Debug from "@/components/DebugList.vue";

export default {
  data() {
    return {
      drawerLeft: true,
      drawerRight: false,
      showDebug: false,
      acceptItem: {
        left: true,
        debug: false,
        right: false,
      },
      records: [],
      navbar: [
        //這邊路由會改成依照權限顯示
        {
          title: "人員管理",
          to: "/users",
        },
      ],
    };
  },
  components: {
    TopBar,
    LeftSidebar,
    RightSidebar,
    Snackbar,
    Debug,
  },
  methods: {
    toggleLeftDrawer() {
      console.log("toggleDrawer", this.drawerLeft);
      this.showDebug = false;
      this.drawerLeft = !this.drawerLeft;
    },
    updateDrawerLeft(value) {
      this.drawerLeft = value;
    },
    toggleRightDrawer() {
      console.log("toggleRightDrawer", this.drawerRight);
      this.drawerRight = !this.drawerRight;
    },
    updateDrawerRight(value) {
      this.drawerRight = value;
    },
    toggleDebug() {
      this.drawerLeft = false;
      this.showDebug = true;
    },
    updateDebug(value) {
      this.showDebug = false;
    },
    logout() {
      this.$store.commit("CLEAR_TOKEN");
    },
  },
};
</script>
