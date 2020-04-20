const merge = require("webpack-merge")
const parts = require("./webpack.parts")
const path = require("path")
module.exports = merge([
  //使用html模板插件
  parts.HTMLTemplate({
    template: path.resolve(__dirname,"../","public/template.html"),
  }),
  //使用babel
  parts.loadESNext(),
])