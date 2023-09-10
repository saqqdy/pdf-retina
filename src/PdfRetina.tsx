import { type ExtractPropTypes, type PropType, computed, defineComponent, h, ref } from 'vue-demi'
// import type { PdfRetina } from './types'

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

        // rotate
        const rotate = (event) =>{}

        // zoom in
        const zoomIn = (event) =>{}

        // zoom out
        const zoomOut = (event) =>{}

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
						h('div', {
							class: 'pdf-retina-rotate',
                            onClick:rotate
						},h('i', {
							class: ['iconfont', 'icon-xuanzhuan'],

                        })),
						h('div', {
							class: 'pdf-retina-zoom-in',
                            onClick: zoomIn
						},'+'),
						h('div', {
							class: 'pdf-retina-zoom-out',
                            onClick: zoomOut
						},'-')
					]
				)
			)
		// return () => (
		// 	<div ref="canvasRef" class="canvas-content">
		// 		{/* <div class="ctrl" :class="{ 'ctrl-rotate': 'isRotate' }">
		//             <div class="scale-btn" @click="roratePdf">
		//                 <i class="iconfont icon-xuanzhuan"></i>
		//             </div>
		//             <div class="scale-btn" @click="scalePDF('add')">＋</div>
		//             <div class="scale-btn" @click="scalePDF">－</div>
		//         </div> */}
		// 	</div>
		// )
	}
})
