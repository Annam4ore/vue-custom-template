# <%=name%>
   
> <%=description%>
   
## 快速開始

### 安裝依賴

```bash
npm install
```

### 開發環境

啟動開發服務器，支援熱重載：

```bash
npm run serve
```

### 生產環境

編譯與打包代碼用於生產環境：

```bash
npm run build
```

## 環境相關命令

```bash
# 使用 production 環境啟動服務
npm run pro-serve

# 使用 m4ore 環境啟動服務
npm run m4ore-serve

```

## 使用此模板創建新專案

### 先決條件

確保已安裝最新版本的 Vue CLI：

```bash
npm install -g @vue/cli
```

### 從 GitHub 創建專案

```bash
# 公開倉庫
vue create --preset 用戶名/vue-custom-template 新專案名稱

# 私有倉庫
vue create --preset 用戶名/vue-custom-template --clone 新專案名稱
```

### 啟動新專案

```bash
cd 新專案名稱
npm install
npm run serve
```

## 錯誤處理

全局錯誤處理已通過 `errorPlugin.js` 設定，可以根據需求進行自定義。