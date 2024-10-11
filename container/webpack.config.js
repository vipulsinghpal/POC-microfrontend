const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3001, 
    open: true,
    hot: true,
  },
  output: {
    publicPath: 'http://localhost:3001/', 
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
      name: 'container', // Host
      remotes: {
        microfrontend: 'microfrontend@http://localhost:3002/remoteEntry.js', // Reference the Microfrontend's remote entry
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
