// legacy:  https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/config/webpack.config.js
// example: https://github.com/webpack/webpack/tree/main/examples
// doc:     https://webpack.js.org/concepts/

const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");

module.exports = (env, arg) => {
  const isProduction = arg.mode === "production";
  const envConfig = isProduction
    ? require("./webpack.config.prod")
    : require("./webpack.config.dev");

  const mergedConfig = merge(require("./webpack.config.common"), envConfig);
  const loadDotEnv = isProduction ? "" : `.${process.env.NODE_ENV}`;
  require("dotenv").config({
    path: `.env${loadDotEnv}`,
  });

  mergedConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  );

  return mergedConfig;
};
