<template>
    <div>
        <v-chip class="pa-lg-8 fixed-chip" color="orange" text-color="white" x-lg-large>
            <v-icon>
                mdi-star
            </v-icon>
            <p class="text-lg-h4 font-weight-bold mb-0">測試機!!!</p>
            <v-icon>
                mdi-star
            </v-icon>
        </v-chip>
    </div>
</template>
<script>
export default {
    data() {
        return {
        };
    },
}
</script>
<style>
.fixed-chip {
    position: fixed;
    top: 0rem;
    right: 7rem;
    z-index: 5;
}


@media only screen and (max-width: 1024px) {
  .fixed-chip {
        top: 0.8rem;
    }
}



</style>