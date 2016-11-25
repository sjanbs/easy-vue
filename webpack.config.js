var webpack           = require('webpack');
var webpackDevServer  = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractPlugin     = require('extract-text-webpack-plugin');// separate css
var CleanPlugin       = require('clean-webpack-plugin');// clean bulid file

var webpackConfig     = module.exports = {};//　init object
var production        = process.env.NODE_ENV === 'production';// production environment

var domain            = process.env.DOMAIN; // your domain process.env.DOMAIN

// input
webpackConfig.entry　 =　{
  app:[
    // main
    './app.js',
  ],
};

webpackConfig.output = {
  path: './dist',
  publicPath: domain+'/dist/',
  filename: production? '[name].[hash].js': '[name].js'
};//　output

//doc loader
webpackConfig.module = {
  loaders : [
    {
      test: /\.css$/,
      loader: ExtractPlugin.extract('style', 'css')
    },
    {
      test: /\.vue$/,
      loader: 'vue'
    },
    {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    },
    {
      test: /\.(eot(|\?v=.*)|woff(|\?v=.*)|woff2(|\?v=.*)|ttf(|\?v=.*)|svg(|\?v=.*))$/,
      loader: 'file'
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'file'
    },
    {
      test: /\.json/,
      loader: 'json'
    },
  ]
};

webpackConfig.plugins = [
  // make index.html
  new HtmlWebpackPlugin({
    title: 'easy-vue',
    filename: '../index.html',
    template: './index.template.html'
  }),
  // separate css file
  new ExtractPlugin(production? 'app.[hash].css': 'app.css'),
  // cancel warn when use webpack -p
  new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
  }),
];

/* production plugins need */
if (production) {
  webpackConfig.plugins.concat([
    // clean build file
    new CleanPlugin('dist')
    ]);
}
