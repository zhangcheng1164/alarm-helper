1. 设置typescript
    npm i typescript -D
    npx tsc --init
    npm i -D @types/node
    配置tsconfig.js设置 "noEmit": true

2. 设置babel编译ts
    npm i -D @babel/cli @babel/core @babel/node 
    @babelplugin-proposal-class-properties                                    @babel/plugin-proposal-object-rest-spread 
    @babel/plugin-transform-runtime 
    @babel/preset-env @babel/preset-typescript

    npm i @babel/runtime-corejs3

3. 配置 eslint
    具体可以根据 .eslintrc.js和prettier.rc
    
---

将本地git库关联到github远程分支

git remote add origin https://github.com/zhangcheng1164/cloud-alert-sms.git

git fetch origin 

查看远程log，然后让本地的分支基于远程相关分支最新log做rebase

git rebase -i b3f6ea95ccbb9e5f22cd50e222da344354b319a6

做完rebase后，当前分支就是远程分支的fast-forward了，我们只要关联上远程分支，推送就可以了。
git branch --set-upstream-to=origin/main master

我这里由于名称不一样，推送的时候需要处理一下：
git push origin HEAD:main

这样远程的main分支就跟本地master分支关联上，并保持一致了。

设置remote -> 拉取remote -> 基于远程分支做rebase  -> set-upstream关联本地和远程分支 -> 推送