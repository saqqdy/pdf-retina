<script setup>
import { ref } from 'vue'
import axios from 'axios'
import wrapper from 'pdf-retina'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const instance1 = axios.create()
const instance2 = axios.create()

const pdfRetinaUnique = wrapper(instance1, { unique: true, onCancel })
const pdfRetinaOrderly = wrapper(instance2, { orderly: true })

const cancelledRequestData = ref('')
const request1 = ref('')
const request2 = ref('')
const request3 = ref('')
const request4 = ref('')
const request5 = ref('')
const lastRequestID = ref('')

function onCancel(err) {
	const { data } = err.config
	request1.value = 'cancelled'
	cancelledRequestData.value = data
}

// unique
const doRequestUnique = () => {
	// request 1
	pdfRetinaUnique({
		url: '/app/mock/312972/pdf-retina/demo',
		data: { id: 1 }
	}).then(({ data }) => {
		console.log('request 1 resolved => ', data)
		request1.value = 'resolved'
	})
	// request 2
	pdfRetinaUnique({
		url: '/app/mock/312972/pdf-retina/demo',
		data: { id: 2 }
	}).then(({ data }) => {
		console.log('request 2 resolved => ', data)
		request2.value = 'resolved'
	})
}

// orderly
const doRequestOrderly = () => {
	// request 1
	pdfRetinaOrderly({
		url: '/app/mock/312972/pdf-retina/demo',
		data: { id: 3 }
	}).then(({ data }) => {
		console.log('request 3 resolved => ', data)
		request3.value = 'resolved'
		lastRequestID.value = 3
	})
	// request 2
	pdfRetinaOrderly({
		url: '/app/mock/312972/pdf-retina/demo',
		data: { id: 4 }
	}).then(({ data }) => {
		console.log('request 4 resolved => ', data)
		request4.value = 'resolved'
		lastRequestID.value = 4
	})
	// request 3
	pdfRetinaOrderly({
		url: '/app/mock/312972/pdf-retina/demo',
		data: { id: 5 }
	}).then(({ data }) => {
		console.log('request 5 resolved => ', data)
		request5.value = 'resolved'
		lastRequestID.value = 5
	})
}

defineExpose({
	cancelledRequestData,
	request1,
	request2,
	request3,
	request4,
	request5,
	lastRequestID,
	doRequestUnique,
	doRequestOrderly
})
</script>

<template>
	<div>
		<button type="button" @click="doRequestUnique">Do Request (cancel similar request)</button>
		<p></p>
		<div>request 1: {{ request1 }}</div>
		<p></p>
		<div>request 2: {{ request2 }}</div>
		<p></p>
		<div>cancelled request data: {{ cancelledRequestData }}</div>
		<p></p>
		<button type="button" @click="doRequestOrderly">Do Request (return in sequence)</button>
		<p></p>
		<div>request 3: {{ request3 }}</div>
		<p></p>
		<div>request 4: {{ request4 }}</div>
		<p></p>
		<div>request 5: {{ request5 }}</div>
		<p></p>
		<div>last request id is: {{ lastRequestID }}</div>
	</div>
</template>
