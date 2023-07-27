import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { mergeConfig } from 'vite'
// import viteConfig from './vite.config'

// mergeConfig not working :(
// export default mergeConfig(
//   viteConfig,
//   defineConfig({
//     test: {
//       environment: 'jsdom',
//       exclude: [...configDefaults.exclude, 'e2e/*'],
//       root: fileURLToPath(new URL('./', import.meta.url)),
//       transformMode: {
//         web: [/\.[jt]sx$/]
//       }
//     }
//   })
// )

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    base: env.VITE_BASE_URL,
    server: {
      port: 8080
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    test: {
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', '@vue/composition-api']
      },
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/]
      }
    }
  }
})
