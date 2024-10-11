const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3002, 
    open: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'microfrontend', // The name of the microfrontend application
      filename: 'remoteEntry.js', // The file that the container will use to load remote modules
      exposes: {
        './Dashboard': './src/Dashboard',  // Expose Dashboard component
      },
      shared: { 
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' }, 
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
