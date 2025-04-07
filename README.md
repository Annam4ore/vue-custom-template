# Vue 後台管理系統模板
   
> 一個專為後台管理系統設計的 Vue 2 自定義模板，集成了 Vuetify 2、Vuex、Vue Router 等常用工具
   
特色功能

🎨 基於 Vuetify 2 的精美 UI 界面
🔐 內建權限驗證流程
📊 用戶管理示例頁面
🌐 API 請求封裝與錯誤處理
🌍 多環境配置（開發、測試、生產）
🔄 全局錯誤日誌收集與展示
📱 響應式設計，適配各種裝置

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
Copy├── public/            # 靜態資源
├── src/
│   ├── api/           # API 請求模組
│   ├── assets/        # 資源文件
│   ├── components/    # 全局組件
│   ├── layout/        # 頁面布局
│   ├── libs/          # 工具庫
│   ├── plugins/       # 插件配置
│   ├── router/        # 路由設置
│   ├── store/         # Vuex 狀態管理
│   ├── utils/         # 工具函數
│   ├── views/         # 頁面視圖
│   ├── App.vue        # 主應用組件
│   ├── main.js        # 應用入口
│   └── errorPlugin.js # 錯誤處理插件
├── .env.development   # 開發環境變數
├── .env.m4ore         # m4ore 環境變數
├── .env.production    # 生產環境變數
├── babel.config.js    # Babel 配置
└── vue.config.js      # Vue CLI 配置
已集成的庫與插件

Vue 2.6.14
Vuetify 2.6.0
Vue Router 3.5.1
Vuex 3.6.2
Axios 1.3.5
Material Design Icons
SASS/LESS 支持

功能說明
用戶認證
系統內建登入頁面與權限驗證，路由守衛會自動檢查用戶是否已登入，未登入用戶會自動導向登入頁面。
錯誤處理
全局錯誤處理已通過 errorPlugin.js 設定，可以捕獲：

Vue 邏輯錯誤
JavaScript 錯誤
靜態資源載入錯誤
API 請求錯誤
Promise 錯誤

錯誤日誌會被收集並可在開發模式下查看。
多環境配置
支持多環境配置，可根據不同環境使用不同的 API 基址和應用名稱。
自定義配置
應用名稱與 API 基址
在創建專案時，您可以自定義以下配置：

專案名稱
專案描述
作者名稱
API 基礎 URL
應用程式名稱

這些配置會自動應用到相應的環境變數文件中。
