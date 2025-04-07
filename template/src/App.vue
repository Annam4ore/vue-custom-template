<template>
  <v-app>
    <router-view></router-view>
    <ShowEnv v-if="isTestEnv || isDevEnv" />
    <Snackbar></Snackbar>
  </v-app>
</template>
<script>
import Snackbar from '@/components/Snackbar.vue'
import ShowEnv from '@/components/EnvFixedup.vue'
export default {
  name: 'App',
  data() {
    return {
      isTestEnv: process.env.VUE_APP_BASE_API.includes('test') === true,
      isDevEnv: process.env.VUE_APP_BASE_API.includes('x.m4ore') === true,
    };
  },
  components: {
    Snackbar, ShowEnv
  },
  mounted() {
    if (process.env.VUE_APP_BASE_API.includes('test') === true) {
      document.title = "測試站-m4ore"
    }else if (process.env.VUE_APP_BASE_API.includes('x.m4ore') === true) {
      document.title = "測試站-development"
    }
  }
};
</script>