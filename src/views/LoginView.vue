<template>
    <v-app class="app-background" style="background-color: #f0f2f7">
        <v-main>
            <v-container fill-height>
                <v-layout justify-center align-center>
                    <v-flex xs10 sm6 md4 lg3>
                        <h3 class="text-center">{{ systemName }}</h3>
                        <v-form class="mt-5">
                            <v-text-field v-model="user.username" name="Username" label="帳號" type="text"
                                prepend-icon="mdi-account-circle" required></v-text-field>
                            <v-text-field v-model="user.password" name="Password" label="密碼" type="password"
                                prepend-icon="mdi-lock" required>
                            </v-text-field>
                            <div class="d-flex mt-3">
                                <!-- <v-btn outlined width="48%">忘記密碼</v-btn>
                  <v-spacer></v-spacer> -->
                                <v-btn color="light-blue darken-4 white--text" block @click="login"><v-progress-circular
                                        indeterminate color="white" :width="3" class="mx-2"
                                        v-if="isLoading"></v-progress-circular>登入</v-btn>
                            </div>
                        </v-form>
                        <p class="mt-10 text-center text-caption">
                            ©Powered by
                            <span class="cusor-point" @click="toM4ore">M4ORE</span> 2017–{{
                                currentYear
                            }}
                        </p>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { Login } from "@/api/login";
export default {
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
            currentYear: null,
            isLoading: false,
            systemName: process.env.VUE_APP_NAME || '後台管理系統'
        };
    },
    methods: {
        async login() {
            if (this.user.username === '' || this.user.password === '') {
                this.$store.dispatch("snackbar/open_snackbar", {
                    msg: "請輸入帳號密碼",
                    color: "error",
                });
                return;
            }
            this.isLoading = true;
            try {
                const { data } = await Login(this.user);
                this.isLoading = false;
                if (data.status === true) {
                    await this.$store.dispatch("initToken", data.data.token);
                    this.$store.dispatch("snackbar/open_snackbar", {
                        msg: "登入成功!",
                        color: "success",
                    });
                    this.$router.push({ path: "/users", replace: true });
                } else if (data.status === false) {
                    this.$store.dispatch("snackbar/open_snackbar", {
                        msg: data.msg,
                        color: "error",
                    });
                }
            } catch (error) {
                console.error("Login error:", error);
            }
        },
        getCurrentYear() {
            this.currentYear = new Date().getFullYear();
        },
        toM4ore() {
            window.location.assign("https://m4ore.com/", "_blank");
        },
    },
    mounted() {
        this.getCurrentYear();
    },
};
</script>

<style scoped>
.cusor-point {
    cursor: pointer;
}

.app-background {
    position: relative;
    background-color: #f0f2f7;
    overflow: hidden;
}

.v-main {
    position: relative;
    z-index: 1;
}
</style>