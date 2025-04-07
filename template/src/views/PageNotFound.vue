<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center">
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="7" lg="5">
                <v-img src="../assets/404.png" width="800" height="800" contain></v-img>
            </v-col>
            <v-col cols="12" sm="4" md="4" lg="4">
                <v-card elevation="0" max-width="480px">
                    <v-card-text>
                        <p class="display-3 font-weight-bold">OOPS...</p>
                        <p class="display-1">PAGE <span class="font-weight-bold">NOT FOUND</span></p>
                        <p class="text-h6">Sorry, the requested page does not exist.</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary" @click="$router.push('/')">back</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>