import {
  defineConfig, presetAttributify, presetUno, presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset 选项 */ }),
    presetUno(),
    presetIcons({
      warn: true,
    }),
    // ...自定义 presets
  ],
})
