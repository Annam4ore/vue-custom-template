Vue 後台管理系統模板

一個專為後台管理系統設計的 Vue 2 自定義模板，集成了 Vuetify 2、Vuex、Vue Router 等常用工具，幫助您快速開發高效、美觀的管理介面。

特色功能

🎨 基於 Vuetify 2 的 UI 界面
📊 使用者管理範例頁面
🌐 API 請求封裝與錯誤處理
🌍 多環境配置（開發、測試、生產）
🔄 全局錯誤日誌收集與展示

快速開始
安裝前提
確保已安裝最新版本的 Vue CLI：
bashCopynpm install -g @vue/cli
從模板創建新專案
bashCopy# 使用模板創建專案
vue create --preset Annam4ore/vue-custom-template 新專案名稱

# 如果是私有倉庫，請使用
vue create --preset Annam4ore/vue-custom-template --clone 新專案名稱
啟動新專案
bashCopycd 新專案名稱
npm install
npm run serve
環境相關命令
bashCopy# 開發環境啟動服務
npm run serve

# 使用 production 環境啟動服務
npm run pro-serve

# 使用 m4ore 環境啟動服務
npm run m4ore-serve

# 編譯與打包代碼用於生產環境
npm run build

# 編譯與打包代碼用於 m4ore 環境
npm run pro-build
專案架構
