const path = require('path')
const entryPath = path.join(__dirname, './lib/index.styl')

function pxToUnit (customOptions = {}) {
  let options = Object.assign({
    targetUnit: 'vw',
    ignoreThreshold: 1,
    viewportWidth: 375,
    viewportHeight: 667,
    htmlFontSize: 37.5,
    needConvert: true
  }, customOptions)
  return function (style) {
    style.define('target-unit', options.targetUnit)
    style.define('ignore-threshold', options.ignoreThreshold)
    style.define('viewport-width', options.viewportWidth)
    style.define('viewport-height', options.viewportHeight)
    style.define('html-font-size', options.htmlFontSize)
    style.define('need-convert', options.needConvert)
    style.import(entryPath)
  }
}

pxToUnit.path = entryPath
pxToUnit.version = require(path.join(__dirname, './package.json')).version

module.exports = pxToUnit