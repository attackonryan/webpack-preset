const merge = require("webpack-merge")
const parts = require("./webpack.parts")

module.exports = merge([
  //设置hash
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },
  //移除无用css
  // parts.purifyCSS(),
  //抽离css
  parts.extractCSS({
    use: [parts.autoprefix()],
  }),
  //加载图片
  parts.loadImages({
    options: {
      limit: 15000,
    },
  }),
  //加载字体
  parts.loadFonts(),
  //生成sourceMap
  parts.loadSourceMaps({
    type: "source-map"
  }),
  //构建时清理目录
  parts.clean(),
])