const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const errorOverlayPlugin = new ErrorOverlayPlugin();
const extractTextPlubin = new ExtractTextPlugin("css/app-[hash].css");
const definePlugin = new webpack.DefinePlugin({
  API_URL: JSON.stringify("https://lms1210.azurewebsites.net"),
  HOST_URL: JSON.stringify("https://lms.cokecoder.net")
});

module.exports = {
  entry: "./src/index.js",
  devtool: "none",
  output: {
    publicPath: "/",
    path: path.resolve("build"),
    filename: "app-[hash].js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        use: ["eslint-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [htmlPlugin, extractTextPlubin, definePlugin, errorOverlayPlugin]
};
