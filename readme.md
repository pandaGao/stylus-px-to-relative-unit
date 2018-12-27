# stylus-px-to-relative-unit

[![npm version](https://badge.fury.io/js/stylus-px-to-relative-unit.svg)](https://badge.fury.io/js/stylus-px-to-relative-unit)
[![Build Status](https://travis-ci.org/pandaGao/stylus-px-to-relative-unit.svg?branch=master)](https://travis-ci.org/pandaGao/stylus-px-to-relative-unit)

A stylus plugin to convert px to relative length units (vw / rem)

## Install
```shell
npm install stylus-px-to-relative-unit
```

## Usage

```javascript
// webpack.config.js
const pxToUnit = require('stylus-px-to-relative-unit')
...
{
  loader: 'stylus-loader',
  options: {
    use: [pxToUnit({
      // Options
    })],
  }
},
...
```


## Options

```javascript
pxToUnit({
  targetUnit: 'vw',
  ignoreThreshold: 1,
  viewportWidth: 375,
  viewportHeight: 667,
  htmlFontSize: 37.5
})
```

| Options         | Default       | Description  |
| --------------- |:-------------:|:-----|
| targetUnit      | 'vw' | target relative length unit. Support 'vw', 'rem' and 'vw&rem' |
| ignoreThreshold | 1    | px values less than this threshold won't be converted |
| viewportWidth   | 375  | base viewport width (for targetUnit: 'vw' ) |
| viewportHeight  | 667  | base viewport height (for targetUnit: 'vw', currently useless) |
| htmlFontSize    | 37.5 | base html font-size (for targetUnit: 'rem') |
| needConvert     | true |  |

### targetUnit: 'vw&rem'

If you want to use unit vw and also worry about browser support, you can use 'vw&rem' mode. For example:

```Stylus
// Input 
.test
  border 3.75px solid #fff

// Output
.test {
  border: 0.1rem solid #fff;
  border: 1vw solid #fff;
}
```

For browser doesn't support vw, it will automatically use rem to layout.

**Notice: If you need to limit max/min width of the layout, this mode is not suit for you**

### needConvert
For special files don't want to be converted, add 'need-convert = false' on top of each stylus files.
```Stylus
// Input
need-convert = false
.test
  width 3.75px

// Output
.test {
  width: 3.75px;
}
```


## GLobal stylus function
This plugin will not convert px arguments in css functions like 'translate()', but provides some global stylus functions for users to convert px value manually.

### px2vw(val)
```Stylus
// Input
.test
  transform translate(px2vw(3.75px), px2vw(3.75px))

// Output
.test {
  transform: translate(1vw, 1vw);
}
```

### px2rem(val)
```stylus
// Input
.test
  transform translate(px2rem(3.75px), px2rem(3.75px))

// Output
.test {
  transform: translate(0.1rem, 0.1rem);
}
```

## Ignored argument
For arguments don't want to be converted, wrap them with quote.
```stylus
// Input
.test
  padding '3.75px' 3.75px

// Output
.test {
  padding: 3.75px 1vw;
}
```

## Changelog

### v1.2.0 - 2018/12/27
* Add 'needConvert' option

### v1.1.1 - 2018/10/28
* Optimize output in 'vw&rem' mode

### v1.1.0 - 2018/10/13
* Support option targetUnit 'vw&rem'


## Acknowledgments

Inspired by [jaywcjlove/stylus-px2rem](https://github.com/jaywcjlove/stylus-px2rem)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
