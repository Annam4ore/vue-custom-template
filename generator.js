module.exports = (api, options) => {
    // 修改 package.json
    api.extendPackage({
        name: options.name,
        description: options.description,
        author: options.author,
        scripts: {
            "pro-serve": "vue-cli-service serve --mode production",
            "m4ore-serve": "vue-cli-service serve --mode m4ore",
            "serve": "vue-cli-service serve",
            "pro-build": "vue-cli-service build --mode m4ore",
            "build": "vue-cli-service build"
        },
        dependencies: {
            "axios": "^1.3.5",
            "caniuse-lite": "^1.0.30001633",
            "core-js": "^3.8.3",
            "vue": "^2.6.14",
            "vue-axios": "^3.5.2",
            "vue-router": "^3.5.1",
            "vuex": "^3.6.2",
            "vuetify": "^2.6.0",
            "@mdi/font": "^7.4.47"
        },
        devDependencies: {
            "@vue/cli-plugin-babel": "~5.0.0",
            "@vue/cli-plugin-router": "~5.0.0",
            "@vue/cli-plugin-vuex": "~5.0.0",
            "@vue/cli-service": "~5.0.0",
            "less": "^4.2.0",
            "less-loader": "^12.2.0",
            "sass": "^1.32.7",
            "sass-loader": "^12.0.0",
            "vue-cli-plugin-vuetify": "~2.5.8",
            "vue-template-compiler": "^2.6.14",
            "vuetify-loader": "^1.7.0"
        }
    });

    // 只渲染模板檔案，不要嘗試生成動態檔案
    api.render('./template');

    // 創建完成後執行的動作
    api.onCreateComplete(() => {
        const fs = require('fs');
        const path = require('path');

        // 創建環境變數檔案
        const envDev = `VUE_APP_BASE_API=${options.apiBaseUrl || 'https://studio-test.m4ore.com'}
VUE_APP_NAME=${options.appName || '後台管理系統'}`;

        const envProd = `VUE_APP_BASE_API=${options.apiBaseUrl || 'https://studio-test.m4ore.com'}
VUE_APP_NAME=${options.appName || '後台管理系統'}`;

        const envM4ore = `VUE_APP_BASE_API=${options.apiBaseUrl || 'https://studio-test.m4ore.com'}
VUE_APP_NAME=${options.appName || '後台管理系統'}`;

        // 寫入環境檔案
        fs.writeFileSync(api.resolve('.env.development'), envDev);
        fs.writeFileSync(api.resolve('.env.production'), envProd);
        fs.writeFileSync(api.resolve('.env.m4ore'), envM4ore);

        // 生成 README.md
        const readmeContent = `# ${options.name || '專案名稱'}

> ${options.description || '專案描述'}

## 快速開始

### 安裝依賴

\`\`\`bash
npm install
\`\`\`

### 開發環境

啟動開發服務器，支援熱重載：

\`\`\`bash
npm run serve
\`\`\`

### 生產環境

編譯與打包代碼用於生產環境：

\`\`\`bash
npm run build
\`\`\`

## 環境相關命令

\`\`\`bash
# 使用 production 環境啟動服務
npm run pro-serve

\`\`\`

## 使用此模板創建新專案

### 先決條件

確保已安裝最新版本的 Vue CLI：

\`\`\`bash
npm install -g @vue/cli
\`\`\`

### 從 GitHub 創建專案

\`\`\`bash
# 公開倉庫
vue create --preset 用戶名/vue-custom-template 新專案名稱

# 私有倉庫
vue create --preset 用戶名/vue-custom-template --clone 新專案名稱
\`\`\`

### 啟動新專案

\`\`\`bash
cd 新專案名稱
npm install
npm run serve
\`\`\`

## 錯誤處理

全局錯誤處理已通過 \`errorPlugin.js\` 設定，可以根據需求進行自定義。

## 作者

${options.author || ''}
`;
        fs.writeFileSync(api.resolve('README.md'), readmeContent);
    });
};