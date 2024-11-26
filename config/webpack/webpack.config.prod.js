const path = require("path");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
        include: path.resolve(__dirname, "../..", "src/"),
        options: {
          plugins: [
            [
              "babel-plugin-jsx-remove-data-test-id",
              {
                attributes: ["data-testid"], // remove "data-selenium" too on prod only
              },
            ],
          ],
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "deps",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        },
      },
    },
  },
};
