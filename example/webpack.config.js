const webpack = require('webpack')
const ForkCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

let config = {
  devtool: isProduction ? false : 'cheap-module-eval-source-map',
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: path.resolve('../index.js')},
          {loader: 'ts-loader', options: {transpileOnly: true}}
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    hot: true,
    overlay: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  plugins: [
    new ForkCheckerPlugin({tslint: true}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    })
  ]
}

if (isProduction) {
  config.plugins.push(new UglifyPlugin)
  config.output.filename.replace('.js', '[chunk].js')
} else {
  config.plugins.push(new webpack.NamedModulesPlugin())
}

module.exports = config
