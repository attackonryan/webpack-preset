const merge = require("webpack-merge")
const parts = require("./webpack.parts")

module.exports = merge([
  //抽离css
  parts.extractCSS({
    use: [parts.autoprefix()],
  }),
  //移除无用css
  parts.purifyCSS(),
  //加载图片
  parts.loadImages({
    options: {
      limit: 15000,
    },
  }),
  //加载字体
  parts.loadFonts(),
])