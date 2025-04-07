<template>
  <div>
    <v-container>
      <v-card
        class="mx-auto mt-8"
        elevation="0"
        style="background-color: transparent"
      >
        <v-container>
          <v-row>
            <v-breadcrumbs divider="\" :items="breadcrumbs"></v-breadcrumbs>
            <v-spacer></v-spacer>
            <v-btn large class="primary pa-6" @click="openAddDialog"
              >新增人員</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
      <br />
      <v-card class="mx-auto pa-3 px-5">
        <v-card-text>
          <div class="d-flex">
            <div class="d-flex align-center">
              <v-text-field
                label="搜尋人員名稱或手機"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                outlined
                dense
                clearable
                hide-details="auto"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>
        <br />
        <v-data-table
          :headers="headers"
          :items="formattedUsers"
          :search="search"
          :footer-props="{ 'items-per-page-text': '每頁顯示行數' }"
          loading-text="loading..."
          :loading="loading"
        >
          <template slot="no-data">
            <div>目前無資料</div>
          </template>
          <template #item.actions="{ item }">
            <div class="d-flex">
              <v-btn class="primary me-2" small @click="viewItem(item)"
                >編輯</v-btn
              >
              <v-btn class="error" dark small @click="viewDelete(item)"
                >刪除</v-btn
              >
            </div>
          </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="addDialog" width="850" persistent>
        <TemplateModal
          :title="'新增人員'"
          :data="add"
          @save-dialog="saveAdd"
          @cancel-dialog="cancelAdd"
        />
      </v-dialog>

      <v-dialog v-model="editDialog" width="850" persistent>
        <TemplateModal
          :title="'編輯人員'"
          :isEdit="true"
          :data="data"
          @save-dialog="saveEdit"
          @cancel-dialog="() => (editDialog = false)"
        />
      </v-dialog>

      <v-dialog v-model="isDeleteModel" width="300" persistent>
        <ConfirmModal
          :title="'是否刪除人員?'"
          :confirmText="'是'"
          :cancelText="'否'"
          :isReverse="true"
          :toolbarColor="'error'"
          @confirm="archiveUser"
          @cancel="isDeleteModel = false"
          @close-dialog="isDeleteModel = false"
        />
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import {
  getUser,
  addUser,
  editUser,
  deleteUser,
} from "@/api/user";
import TemplateModal from "@/components/user/TemplateModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: { TemplateModal, ConfirmModal },
  
  data() {
    return {
      breadcrumbs: [
        {
          text: "人員管理",
          disabled: true,
        },
      ],
      headers: [
        { text: "姓名", value: "name" },
        { text: "性別", value: "gender" },
        { text: "年齡", value: "age" },
        { text: "生日", value: "birth" },
        { text: "婚姻狀況", value: "isMarried" },
        { text: "狀態", value: "isActive" },
        { text: "備註", value: "comment" },
        { text: "操作", value: "actions" },
      ],
      id: "",
      loading: false,
      addDialog: false,
      editDialog: false,
      isRemind: false,
      isDeleteModel: false,
      search: "",
      datas: [ //假資料
        {
          id: 1,
          name: "王小明",
          gender: '男',
          age: 20,
          birth: "2024-04-02",
          comment: "test",
          isMarried: "0",
          isActive: true,
        }
      ],
      defaultUserData() {
        return {
          name: "",
          age: "",
          birth: "",
          gender: "",
          comment: "",
          is_married: "0",
          is_active: true,
        };
      },
      add: null,
      data: null,
    };
  },
  
  computed: {
    formattedUsers() {
      return this.datas.map(user => ({
        ...user,
      }));
    }
  },
  
  watch: {
    datas: function (val) {
      if (val) {
        this.loading = false;
      }
    },
  },
  
  methods: {
    resetForm(formName) {
      this[formName] = this.defaultUserData();
    },
    
    openAddDialog() {
      this.resetForm('add');
      this.addDialog = true;
    },
    
    viewItem(item) {
      this.data = {
        id: item.id,
        name: item.name || "",
        age: item.age || "",
        gender: item.gender || "",
        birth: item.birth || "",
        comment: item.comment || "",
        is_married: item.isMarried || "0",
        is_active: item.isActive ?? true,
      };
      this.editDialog = true;
    },
    
    cancelAdd() {
      this.resetForm('add');
      this.addDialog = false;
    },
    
    viewDelete(item) {
      this.id = item.id;
      this.isDeleteModel = true;
    },
    remindchangeStatus(item) {
      this.isRemind = true;
      this.id = item.id;
    },
    closeStatusDialog() {
      this.isRemind = false;
      this.getAllList();
    },
    handleApiResponse(data, successMsg, errorMsg) {
      if (data.status === true) {
        this.$store.dispatch("snackbar/open_snackbar", {
          msg: successMsg,
          color: "success",
        });
        this.getAllList();
        this.addDialog = false;
        this.editDialog = false;
        this.isRemind = false;
      } else {
        this.$store.dispatch("snackbar/open_snackbar", {
          msg: errorMsg || data.msg,
          color: "error",
        });
      }
    },
    handleApiError(error, message = "網路異常，請稍後再試!") {
      console.error(`API error: ${error}`);
      this.$store.dispatch("snackbar/open_snackbar", {
        msg: message,
        color: "error",
      });
    },
    async saveEdit(edit) {
      try {
        const { data } = await editUser(edit);
        this.handleApiResponse(data, "修改成功!", `修改失敗: ${data.msg}`);
      } catch (error) {
        this.handleApiError(error);
      }
    },
    async saveAdd(add) {
      try {
        const { data } = await addUser(add);
        this.handleApiResponse(data, "新增成功!", `新增失败!: ${data.msg}`);
      } catch (error) {
        console.error("addUser error:", error);
        this.$store.dispatch("snackbar/open_snackbar", {
          msg: "網路異常，請稍後再試!",
          color: "error",
        });
      }
    },
    async getAllList() {
      this.loading = true;
      try {
        const { data } = await getUser();
        if (data.status === true) {
          this.datas = data.data;
        } else {
          this.$store.dispatch("snackbar/open_snackbar", {
            msg: data.msg,
            color: "error",
          });
        }
      } catch (error) {
        console.error("getUser error:", error);
        this.$store.dispatch("snackbar/open_snackbar", {
          msg: "網路異常，請稍後再試!",
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    async archiveUser() {
      try {
        const { data } = await deleteUser(this.id);
        if (data.status === true) {
          this.isDeleteModel = false;
          this.$store.dispatch("snackbar/open_snackbar", {
            msg: "刪除成功!",
            color: "success",
          });
        } else {
          this.$store.dispatch("snackbar/open_snackbar", {
            msg: data.msg,
            color: "error",
          });
        }
      } catch (error) {
        console.error("resetPasswordUser error:", error);
        this.$store.dispatch("snackbar/open_snackbar", {
          msg: "網路異常或服務器錯誤，刪除人員失敗!",
          color: "error",
        });
      }
    },
  },
  mounted() {
    this.add = this.defaultUserData();
    this.data = this.defaultUserData();
    
    // 獲取使用者列表
    // this.getAllList();
  },
};
</script>
<style>
</style>
