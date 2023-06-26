module.exports = {
  mode: 'development', // Set the mode to either 'development' or 'production'
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            
          },
          
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  
};
