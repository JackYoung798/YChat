import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

//element-plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    [
      "import",
      {
          "libraryName": "@icon-park/vue-next",
          "libraryDirectory": "es/icons",
          "camel2DashComponentName": false 
      }
    ],
  ],
  server: {
    port: 5173,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
})