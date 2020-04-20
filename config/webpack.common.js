const merge = require("webpack-merge")
const parts = require("./webpack.parts")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "webpack-preset",
      }),
    ],
  },
  //使用babel
  parts.loadESNext(),
])