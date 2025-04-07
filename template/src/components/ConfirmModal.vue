<template>
  <div>
    <v-toolbar dark :color="toolbarColor">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="rounded-0">
      <v-divider></v-divider>
      <v-card-actions>
        <template v-if="!isReverse">
          <v-btn color="black" outlined dark @click="cancelAction" class="pa-2 ma-2">
            {{ cancelText }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="black" dark @click="confirmAction" class="pa-2 ma-2">
            {{ confirmText }}
          </v-btn>
        </template>
        <template v-else>
          <v-btn color="black" dark @click="confirmAction" class="pa-2 ma-2">
            {{ confirmText }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="black" outlined dark @click="cancelAction" class="pa-2 ma-2">
            {{ cancelText }}
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    content: String,
    toolbarColor: {
      type: String,
      default: "primary"
    },
    confirmText: {
      type: String,
      default: '確認'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    isReverse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("close-dialog");
    },
    confirmAction() {
      this.$emit("confirm");
    },
    cancelAction() {
      this.$emit("cancel");
    },
  },
};
</script>
