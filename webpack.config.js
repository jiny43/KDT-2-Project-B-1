const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'react', 'index.tsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'frontend'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};

module.exports = config;
