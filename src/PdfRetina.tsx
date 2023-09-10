import {
	type ExtractPropTypes,
	type PropType,
	computed,
	defineComponent,
	h,
	nextTick,
	onBeforeMount,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	shallowRef
} from 'vue-demi'
import pdfjsLib, { type PDFDocumentProxy } from 'pdfjs-dist'
import { awaitTo as to } from 'js-cool'
// import type { PdfRetina } from './types'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.entry.js',
	import.meta.url
).toString()
// const cMapUrl = new URL('pdfjs-dist/cmaps', import.meta.url).toString()

export const props = {
	url: {
		type: String,
		default: true
	}
} as const

export type PdfRetinaProps = ExtractPropTypes<typeof props>

export default defineComponent({
	name: 'PdfRetina',
	props,
	emits: ['click'],
	setup(props, { slots, emit }) {
		const canvasRef = ref(null)
		const DEVICE_PIXEL_RATIO = window.devicePixelRatio || 1
		const PDF_SCALE_MAX = 5 * DEVICE_PIXEL_RATIO
		const PDF_SCALE_MIN = 0.2 * DEVICE_PIXEL_RATIO
		const viewOption = reactive({
			scale: 0.6 * DEVICE_PIXEL_RATIO,
			rotation: 0 // 暂时先不加旋转， 手机自动旋转
		})
		const pdfView = shallowRef<PDFDocumentProxy | null>(null) // 缓存pdf数据
		const isRotate = ref(false) // 是否旋转

		// 添加canvas元素，每一页为一个canvas
		const addPage = async (pageNumber, pageCount) => {
			if (!pdfView.value) return
			const [, page] = await to(pdfView.value.getPage(pageNumber))
			if (page) {
				const canvas = document.createElement('canvas') // 在页面中创建canvas
				canvas.id = 'canvas_' + pageNumber
				const el_canvasDiv = document.querySelector('#canvasDiv')
				el_canvasDiv.appendChild(canvas)

				const context = canvas.getContext('2d')
				const viewport = page.getViewport(viewOption)
				canvas.height = Math.ceil(viewport.height)
				canvas.width = Math.ceil(viewport.width)
				canvas.style.cssText = `width: ${
					Math.ceil(viewport.width) / (window.devicePixelRatio || 1)
				}px; height: ${Math.ceil(viewport.height) / (window.devicePixelRatio || 1)}px;`
				// Render PDF page into canvas context
				const renderTask = page.render({
					canvasContext: context,
					viewport
				}) // 开始渲染
				renderTask.promise.then(() => {
					// 渲染完毕后的业务操作
					if (pageNumber === pageCount) {
						// proxy.$loading.hide()
					}
				})
			}
		}

		const resize = () => {
			if (!pdfView.value) return
			// 判断横竖屏
			const width = document.documentElement.clientWidth
			const height = document.documentElement.clientHeight
			if (width > height) {
				// 横屏, 需要去掉旋转， 放大缩小的按钮样式需要调整
				nextTick(() => {
					viewOption.rotation = 0
					const parentNode = document.getElementById('canvasDiv')
					const canvasElements = document.getElementsByTagName('canvas')
					const pageCount = pdfView.value.numPages
					// 删除原有的canvas元素
					for (let i = canvasElements.length - 1; i >= 0; i--) {
						parentNode && parentNode.removeChild(canvasElements[i])
					}
					// 重新生成
					for (let i = 1; i <= pageCount; i++) {
						addPage(i, pageCount)
					}
				})
			}
		}

		/**
		 * get pdf data
		 */
		const getPdf = async (url?: string) => {
			// pdfData = atob(data); // 解码base64
			const [err, pdf] = await to(
				pdfjsLib.getDocument({
					// data: pdfData,
					url: url || props.url,
					cMapUrl: 'http://unpkg.com/pdfjs-dist@3.9.179/cmaps/',
					cMapPacked: true
				}).promise
			)

			if (err) {
				console.error('failed to get PDF data: ', err)
				return
			}
			pdfView.value = pdf // cache pdf data
			const pageCount = pdf.numPages
			for (let i = 1; i <= pageCount; i++) {
				addPage(i, pageCount)
			}
		}

		// rotate
		const rotate = event => {
			if (!pdfView.value) return
			if (viewOption.rotation === 90) {
				viewOption.rotation = 0
			} else {
				viewOption.rotation = 90
				isRotate.value = true
			}
			const parentNode = document.getElementById('canvasDiv')
			const canvasElements = document.getElementsByTagName('canvas')
			const pageCount = pdfView.value.numPages
			// 删除原有的canvas元素
			for (let i = canvasElements.length - 1; i >= 0; i--) {
				parentNode && parentNode.removeChild(canvasElements[i])
			}
			// 重新生成
			for (let i = 1; i <= pageCount; i++) {
				addPage(i, pageCount)
			}
		}

		// zoom
		const zoom = (scaleNum: number = 0.2) => {
			if (!pdfView.value) return
			if (scaleNum > 0 && viewOption.scale === PDF_SCALE_MAX) {
				console.warn('Maximum scale has been reached')
				return
			}
			if (scaleNum < 0 && viewOption.scale === PDF_SCALE_MIN) {
				console.warn('Minimum scale has been reached')
				return
			}
			viewOption.scale = Math.round(viewOption.scale + scaleNum)

			const parentNode = document.getElementById('canvasDiv')
			const canvasElements = document.getElementsByTagName('canvas')
			const pageCount = pdfView.value.numPages
			// 删除原有的canvas元素
			for (let i = canvasElements.length - 1; i >= 0; i--) {
				parentNode && parentNode.removeChild(canvasElements[i])
			}
			// 重新生成
			for (let i = 1; i <= pageCount; i++) {
				addPage(i, pageCount)
			}
		}

		// zoom in
		const zoomIn = event => zoom(0.2)

		// zoom out
		const zoomOut = event => zoom(-0.2)

		onMounted(() => {
			window.addEventListener('resize', resize, false)
		})

		onBeforeUnmount(() => {
			window.removeEventListener('resize', resize, false)
		})

		onBeforeMount(() => {
			getPdf()
		})

		return () =>
			h(
				'div',
				{
					ref: canvasRef,
					class: 'canvas-content'
				},
				h(
					'div',
					{
						class: ['ctrl', 'ctrl-rotate']
					},
					[
						h(
							'div',
							{
								class: 'pdf-retina-rotate',
								onClick: rotate
							},
							h('i', {
								class: ['iconfont', 'icon-xuanzhuan']
							})
						),
						h(
							'div',
							{
								class: 'pdf-retina-zoom-in',
								onClick: zoomIn
							},
							'+'
						),
						h(
							'div',
							{
								class: 'pdf-retina-zoom-out',
								onClick: zoomOut
							},
							'-'
						)
					]
				)
			)
		// return () => (
		// 	<div id="canvasDiv" class="canvas-content">
		// 		{/* <div class="ctrl" :class="{ 'ctrl-rotate': 'isRotate' }">
		//             <div class="scale-btn" @click="rotate">
		//                 <i class="iconfont icon-xuanzhuan"></i>
		//             </div>
		//             <div class="scale-btn" @click="scalePDF('add')">＋</div>
		//             <div class="scale-btn" @click="scalePDF">－</div>
		//         </div> */}
		// 	</div>
		// )
	}
})
