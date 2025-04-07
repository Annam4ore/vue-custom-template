module.exports = {
    prompts: {
      name: {
        type: 'string',
        required: true,
        message: '專案名稱'
      },
      description: {
        type: 'string',
        required: false,
        message: '專案描述',
        default: 'Vue 後台管理系統'
      },
      author: {
        type: 'string',
        message: '作者名稱'
      },
      apiBaseUrl: {
        type: 'string',
        message: 'API 基礎 URL',
        default: 'https://studio-test.m4ore.com'
      },
      appName: {
        type: 'string',
        message: '應用程式名稱',
        default: '後台管理系統'
      }
    },
    filters: {
      // 可以根據用戶選擇過濾某些文件
    },
    completeMessage: '專案已成功創建！\n\n使用命令:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run serve'
  };