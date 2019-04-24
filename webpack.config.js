const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `build`), // Откуда поднимаем сервер
    publicPath: `http://localhost:8080/`,
    hot: true, // livereload
    inline: true, // alllivereload
    compress: true // сжатие
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`
    }),
    new CopyPlugin([
      { from: `public/css`, to: `css` },
      { from: `public/fonts`, to: `fonts` },
      { from: `public/img`, to: `img` },
      { from: `public/index.html`, to: `index.html` },
      { from: `public/sw.js`, to: `sw.js`},
    ]),
  ]
};
