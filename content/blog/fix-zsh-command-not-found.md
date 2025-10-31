---
id: 1
slug: fix-zsh-command-not-found
title: "zsh: command not found 解決辦法"
excerpt: "遇到 zsh: command not found 錯誤？學習如何檢查和設定終端機環境變數，解決 NVM 和其他命令找不到的問題..."
author: Elvis
imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop"
tags:
  - id: 16
    name: Terminal
    slug: terminal
  - id: 17
    name: Shell
    slug: shell
  - id: 18
    name: macOS
    slug: macos
    color: "#000000"
  - id: 19
    name: Troubleshooting
    slug: troubleshooting
  - id: 20
    name: Dev Environment
    slug: dev-environment
createdAt: "2025-01-26T10:00:00Z"
updatedAt: "2025-01-26T10:00:00Z"
---

## 解決辦法與過程

看你是使用哪一種的終端機

> 依據終端機的不同，來找到啟動終端機前的設定檔

以下目錄，mac 為範例 ( 使用者的家目錄當中的隱藏檔案 )

在 ~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc

檢查是否有設定好要執行的指令？

```sh
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

假使檔案中已經有了就不需要另外儲存後重啟執行，可能會是其他問題。

如果沒有的話那就添加上面的指令吧，存檔後重行執行這隻檔案，我把它全部列出來友善複製。

( 根據你開的終端機不同要執行不同的 )

```bash
source ~/.bash_profile

source ~/.zshrc

source ~/.profile

source ~/.bashrc
```

應該這樣就不會再爆錯了。

## 參考文章

[https://blog.csdn.net/Android_MSK/article/details/115693175](https://blog.csdn.net/Android_MSK/article/details/115693175)
