// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { visualizer } from 'rollup-plugin-visualizer'
// import babelConfig from './babel.config.js'

// const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		assetsDir: '.',
		// manifest: false,
		minify: false,
		lib: {
			entry: {
				index: resolve(__dirname, 'src')
				// demo: resolve(__dirname, 'src', 'demo'),
				// demo1: resolve(__dirname, 'src', 'demo1')
			},
			name: 'PdfRetina',
			// formats: ['es', 'cjs', 'iife'],
			formats: ['es', 'cjs', 'umd', 'iife'],
			// allowAllFormats: true,
			fileName: 'index'
			// fileName: (format, entryName) => {
			// 	if (format === 'es') return `${entryName}.mjs`
			// 	else if (format === 'cjs') return `${entryName}.cjs`
			// }
		},
		// allowAllFormats: true,
		rollupOptions: {
			plugins: [visualizer()],
			external: ['vue', 'vue-demi', 'pdfjs-dist'],
			// input: {
			// 	index: resolve(__dirname, 'src', 'index.js')
			// },
			output: {
				// entryFileNames: `[name].js`,
				// chunkFileNames: `js/[name].[hash].chunk.js`,
				// assetFileNames: assetInfo => {
				// 	const info = assetInfo.name.split('.')
				// 	let extType = info[info.length - 1]
				// 	if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
				// 		extType = 'img'
				// 	} else if (/woff|woff2/.test(extType)) {
				// 		extType = 'css'
				// 	}
				// 	return `static/${extType}/[name]-[hash][extname]`
				// },
				// file: pkg.main,
				// exports: 'auto',
				// format: 'esm',
				globals: {
					vue: 'Vue',
					'vue-demi': 'VueDemi',
					'pdfjs-dist': 'pdfjsLib'
				}
			}
		}
	},
	optimizeDeps: {
		exclude: ['vue-demi']
	},
	plugins: [
		// getBabelOutputPlugin(babelConfig),
		// splitVendorChunkPlugin(),
		vue(),
		vueJsx()
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
