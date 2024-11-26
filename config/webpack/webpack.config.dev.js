// legacy: https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js

const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    open: true,
    allowedHosts: "all",
    host: "0.0.0.0",
    historyApiFallback: true,
    port: 3000,
    compress: true,
    https: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        include: path.resolve(__dirname, "../..", "src/"),
        options: {
          plugins: [
            "babel-plugin-styled-components",
            require.resolve("react-refresh/babel"),
          ],
        },
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
