<template>
    <v-card class="pa-2">
        <v-card-title>
            <span>{{ title }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
            <v-form ref="form">
                <v-row> 
                    <v-col cols="6">
                        <v-text-field 
                            label="姓名" 
                            v-model="formData.name" 
                            :rules="[rules.required]"
                            autofocus
                        ></v-text-field>
                    </v-col>
                    
                    <v-col cols="6">
                        <v-select 
                            label="性別" 
                            :items="genderOptions"  
                            v-model="formData.gender"
                        ></v-select>
                    </v-col>
                    
                    <v-col cols="6">
                        <v-text-field label="年齡" v-model="formData.age"
                            type="number"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-menu v-model="menu_date" :close-on-content-click="false" :nudge-right="0"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="formData.birth" readonly v-bind="attrs" v-on="on"
                                    label="生日"></v-text-field>
                            </template>
                            <v-date-picker v-model="formData.birth" locale="zhHant" :day-format="$getDayFormat"
                                @input="menu_date = false" no-title></v-date-picker>
                        </v-menu>
                    </v-col>
                    <!-- radio -->
                    <v-col cols="6">
                        <span>婚姻狀況:</span>
                        <v-radio-group v-model="formData.is_married" row>
                            <v-radio label="未婚" value="0"></v-radio>
                            <v-radio label="已婚" value="1"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <!-- checkbox -->
                    <v-col cols="6">
                        <span>狀態:</span>
                        <v-checkbox v-model="formData.is_active" label="啟用"></v-checkbox>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea label="備註" v-model="formData.comment" rows="1"></v-textarea>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn outlined @click="cancel" width="20%">關閉</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="save" width="20%" :disabled="!isFormValid">保存</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    
    data() {
        return {
            menu_date: false,
            formData: { ...this.data },
            rules: {
                required: value => !!value || '此欄位為必填',
                email: value => {
                    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return !value || pattern.test(value) || '請輸入有效的電子郵件地址';
                }
            },
            genderOptions: ['男', '女']
        };
    },
    
    computed: {
        isFormValid() {
            return this.$refs.form ? this.$refs.form.validate() : false;
        }
    },
    
    watch: {
        data: {
            handler(newValue) {
                this.formData = { ...newValue };
            },
            deep: true
        }
    },
    
    methods: {
        cancel() {
            this.$emit('cancel-dialog');
        },
        
        save() {
            if (this.$refs.form.validate()) {
                this.$emit('save-dialog', this.formData);
            }
        }
    }
};
</script>