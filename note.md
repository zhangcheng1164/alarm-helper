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
    