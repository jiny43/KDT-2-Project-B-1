const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'react', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'react'),
    filename: 'bundle.js',
  },
  mode: 'development',
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
