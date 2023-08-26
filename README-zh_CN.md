<div style="text-align: center;" align="center">

# pdf-retina

一个支持 retina 高分辨率显示屏的移动端 PDF 预览组件

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![tree shaking][tree-shaking-image]][tree-shaking-url]
![typescript][typescript-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[API 文档](https://www.saqqdy.com/pdf-retina)** • **[更新日志](./CHANGELOG.md)**

**使用其他语言阅读：[English](./README.md) | 简体中文**

</div>

## 体验

在线体验 pdf-retina 功能 [Edit in CodeSandbox](https://codesandbox.io/p/sandbox/github/saqqdy/pdf-retina/tree/master/examples)

## 安装

```bash
# 使用pnpm
$ pnpm install pdf-retina

# 使用npm
$ npm install pdf-retina --save
```

## 使用

### 为 axios 赋上 serializer 功能

```js
import wrapper from 'pdf-retina'

const pdfRetina = wrapper(axios, {
  // unique: false,
  // orderly: true
})

export default pdfRetina
```

### 或者把 serializer 功能赋在 axios 实例上

```js
import wrapper from 'pdf-retina'

const instance = axios.create({
  withCredentials: true
})
const pdfRetina = wrapper(instance, {
  // unique: false,
  // orderly: true
})

export default pdfRetina
```

## API 参考

### pdfRetina

axios serializer 包装器

- 版本: `1.0.0`

- 参数:

| 参数     | 描述                    | 类型                | 可选值              | 是否必填 | 默认值 |
| -------- | ----------------------- | ------------------- | ------------------- | -------- | ------ |
| instance | axios or axios instance | `AxiosInstance`     | axios/axiosInstance | true     | -      |
| options  | serializer options      | `SerializerOptions` | -                   | false    | -      |

- 返回: 返回带 serializer 的 axios 实例

- 示例:

```ts
const http = pdfRetina(instance, {
  // unique: false,
  // orderly: true
})
```

- 类型:

```ts
function axiosWithSeries<T = any, R = AxiosResponse<T>, D = any>(
  config: SerializerRequestOptions<D>
): Promise<R>
function axiosWithSeries<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: SerializerRequestOptions<D>
): Promise<R>
```

### 使用 unpkg CDN

```html
<script src="https://unpkg.com/pdf-retina@1.0.0/dist/index.global.prod.js"></script>
<script>
  const http = pdfRetina(axios)
</script>
```

## 问题和支持

Please open an issue [here](https://github.com/saqqdy/pdf-retina/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/pdf-retina.svg?style=flat-square
[npm-url]: https://npmjs.org/package/pdf-retina
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/pdf-retina/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/pdf-retina&utm_campaign=Badge_Grade
[tree-shaking-image]: https://badgen.net/bundlephobia/tree-shaking/pdf-retina
[tree-shaking-url]: https://bundlephobia.com/package/pdf-retina
[typescript-url]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/pdf-retina.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/pdf-retina?branch=master
[download-image]: https://img.shields.io/npm/dm/pdf-retina.svg?style=flat-square
[download-url]: https://npmjs.org/package/pdf-retina
[gzip-image]: http://img.badgesize.io/https://unpkg.com/pdf-retina/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/pdf-retina/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_pdf-retina
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_pdf-retina
