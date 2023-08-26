<div style="text-align: center;" align="center">

# pdf-retina

PDF preview component for mobile with Retina display support

When multiple requests are made to the same interface in a short period of time, pdf-retina can be useful if you need to ensure that the request executed first returns the results first

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

### **[Documentation](https://www.saqqdy.com/pdf-retina)** • **[Change Log](./CHANGELOG.md)**

**Read this in other languages: English | [简体中文](./README-zh_CN.md)**

</div>

- [pdfRetina](#pdf-retina)
  - [Experience online](#experience-online)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Add serializer feature to axios](#add-serializer-feature-to-axios)
    - [or axios instance](#or-axios-instance)
  - [Behavior](#behavior)
    - [Option.unique](#unique)
    - [Option.orderly](#unique)
  - [API Reference](#api-reference)
    - [pdfRetina](#pdfretina)
    - [pdfRetina.clear](#pdfretinaclear)
    - [pdfRetina.series](#pdfretinaseries)
  - [Using unpkg CDN](#using-unpkg-cdn)
  - [Support & Issues](#support--issues)
  - [License](#license)

## Experience online

Experience the pdf-retina features online [Edit in CodeSandbox](https://codesandbox.io/p/sandbox/github/saqqdy/pdf-retina/tree/master/examples)

## Installing

```bash
# use pnpm
$ pnpm install pdf-retina

# use npm
$ npm install pdf-retina --save
```

## Usage

### Add serializer feature to axios

```js
import wrapper from 'pdf-retina'

const pdfRetina = wrapper(axios, {
  // unique: false,
  // orderly: true
})

export default pdfRetina
```

### or axios instance

```js
import wrapper from 'pdf-retina'

const pdfRetina = wrapper(instance, {
  // unique: false,
  // orderly: true
})

export default pdfRetina
```

## API Reference

### pdfRetina

axios serializer wrapper function

- Since: `1.0.0`

- Arguments:

| Parameters | Description             | Type                | Optional            | Required | Default |
| ---------- | ----------------------- | ------------------- | ------------------- | -------- | ------- |
| instance   | axios or axios instance | `AxiosInstance`     | axios/axiosInstance | true     | -       |
| options    | serializer options      | `SerializerOptions` | -                   | false    | -       |

- Returns: new axios instance with serializer

- Example:

```ts
const http = pdfRetina(instance, {
  // unique: false,
  // orderly: true
})
```

- Types:

```ts
function axiosWithSeries<T = any, R = AxiosResponse<T>, D = any>(
  config: SerializerRequestOptions<D>
): Promise<R>
function axiosWithSeries<T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: SerializerRequestOptions<D>
): Promise<R>
```

### Using unpkg CDN

```html
<script src="https://unpkg.com/pdf-retina@1.0.0/dist/index.global.prod.js"></script>
<script>
  const http = pdfRetina(axios)
</script>
```

## Support & Issues

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
