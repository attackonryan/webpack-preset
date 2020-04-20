const glob = require("glob")
const path = require("path")
const merge = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurifyCSSPlugin = require("purifycss-webpack")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // 默认为 `localhost`
    port, // 默认为 8080
    open: true,
  },
})

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"],
      },
      //解析scss
      {
        test: /\.scss$/,
        use: [
          "style-loader", 
          "css-loader", 
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => ([
                require("autoprefixer"),
                require("precss"),
              ]),
            },
          }
        ],
      },
    ],
  },
})

exports.extractCSS = ({ include, exclude, use = [] } = {}) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  })

  return {
    module: {
      rules: [
        {
          test: /\.(s?)css$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", 
            "sass-loader"
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  }
}

exports.purifyCSS = () => ({
  plugins: [
    new PurifyCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../", "src")}/**/*.js`, {
        nodir: true
      })
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
})

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
})

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: [
          {
            loader: "url-loader",
            options: merge({
              name: "./images/[name].[hash].[ext]"
            },options),
          },
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./images/[name].[hash].[ext]"
            }
          }
        ],
      },
    ],
  },
})

exports.loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "./fonts/[name].[ext]",
          },
        },
      }
    ]
  }
})

exports.loadESNext = ({ include = path.join(__dirname, "../", "src"), exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader",
      },
    ],
  },
});