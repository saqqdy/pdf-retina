import { App } from 'vue-demi'
import PdfRetina from './PdfRetina'

PdfRetina.install = function (app: App) {
	app.component(PdfRetina.name, PdfRetina)
}

export default PdfRetina
export type * from './PdfRetina'
