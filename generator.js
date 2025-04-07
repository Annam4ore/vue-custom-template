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
            "vuetify": "^2.6.0"
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

    // 渲染模板文件
    api.render('./template');

    // 處理環境變數檔案
    api.render({
        '.env.development': () => `VUE_APP_BASE_API=${options.apiBaseUrl || 'https://studio-test.m4ore.com'}
    VUE_APP_NAME=${options.appName || '後台管理系統'}`,
        '.env.production': () => `VUE_APP_BASE_API=${options.apiBaseUrl || 'https://studio-test.m4ore.com'}
    VUE_APP_NAME=${options.appName || '後台管理系統'}`,
        '.env.m4ore': () => `VUE_APP_BASE_API=${options.apiBaseUrl || 'https://studio-test.m4ore.com'}
    VUE_APP_NAME=${options.appName || '後台管理系統'}`
    });
    api.render({
        'src/plugins/vuetify.js': './template/src/plugins/vuetify.js'
    });


    // 添加 README
    api.render({
        'README.md': './template/README.md'
    });
    api.render({
        'src/main.js': './template/src/main.js'
    });

    // 創建完成後執行的動作
    api.onCreateComplete(() => {
        // 替換變量
        const fs = require('fs');
        const files = [
            '.env.development',
            '.env.production',
            '.env.m4ore',
            'README.md'
        ];

        files.forEach(file => {
            const filePath = api.resolve(file);
            if (fs.existsSync(filePath)) {
                let content = fs.readFileSync(filePath, { encoding: 'utf-8' });
                content = content.replace(/<%=apiBaseUrl%>/g, options.apiBaseUrl);
                content = content.replace(/<%=appName%>/g, options.appName);
                content = content.replace(/<%=name%>/g, options.name);
                content = content.replace(/<%=description%>/g, options.description);
                content = content.replace(/<%=author%>/g, options.author);
                fs.writeFileSync(filePath, content);
            }
        });
    });
};