const webpack = require(`webpack`);
const path = require(`path`);

module.exports = {
  node: `development`,
  entry: `./src/main.js`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`,
  },
  devtool: `source-map`
};
