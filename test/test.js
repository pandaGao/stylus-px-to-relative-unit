const fs = require('fs')
const path = require('path')
const assert = require('assert')
const stylus = require('stylus')
const pxToViewport = require('..')

describe('Test px to responsive unit', function () {
  describe('# px to vw', function () {
    fs.readdirSync(__dirname).filter(d => d.includes('.styl')).forEach(f => {
      let filename = f.replace('.styl', '')
      it(filename, function (done) {
        let file = fs.readFileSync(path.join(__dirname, f), 'utf8')
        let expectCss = fs.readFileSync(path.join(__dirname, `${filename}.css`), 'utf8')
        stylus(file)
          .use(pxToViewport())
          .render(function (err, css) {
            if (err) done(err)
            assert.equal(css, expectCss)
            done()
          })
      })
    })
  })


  describe('# px to rem', function () {
    fs.readdirSync(__dirname).filter(d => d.includes('.styl')).forEach(f => {
      let filename = f.replace('.styl', '')
      it(filename, function (done) {
        let file = fs.readFileSync(path.join(__dirname, f), 'utf8')
        let expectCss = fs.readFileSync(path.join(__dirname, `${filename}-rem.css`), 'utf8')
        stylus(file)
          .use(pxToViewport({
            targetUnit: 'rem'
          }))
          .render(function (err, css) {
            if (err) done(err)
            assert.equal(css, expectCss)
            done()
          })
      })
    })
  })
})