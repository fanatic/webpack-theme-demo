const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    quartz: path.resolve(__dirname, 'src/quartz.js'),
    carbon: path.resolve(__dirname, 'src/carbon.js')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        quartzStyles: {
          name: 'quartz',
          test: (m, c, entry = 'quartz') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        carbonStyles: {
          name: 'carbon',
          test: (m, c, entry = 'carbon') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
