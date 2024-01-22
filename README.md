# 支語警察 Discord 機器人

## 總覽

在 Discord 檢測支語並嘗試翻譯成台灣用語。

在使用該專案前，前先到 discord 的開發者網頁申請 Application: [Discord Developer Portal](https://discord.com/developers/applications)

並且透過含有 `client id` 的連結邀請機器人

```
https://discord.com/api/oauth2/authorize?client_id=[[YOUR-CLIENT-ID]]&permissions=32&scope=bot%20applications.commands
```

**注意：請先執行程式，再邀請機器人**


## Develop

### 編輯 token 檔

複製 `src/token.ts.template` 另存成 `src/token.ts`

```ts
export const token = "[YOUR-TOKEN]"
```

### 初始化 npm 專案

```sh
# initialize
npm i

# start the program by
npm run start

# please use lint before making a pull request
npm run lint
```