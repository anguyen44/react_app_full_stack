const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    preferRelative: true,
    alias: {
      shared: path.resolve(__dirname, "../..", "src/shared/"),
      icons: path.resolve(__dirname, "../..", "src/icons/"),
      fonts: path.resolve(__dirname, "../..", "src/fonts/"),
      images: path.resolve(__dirname, "../..", "src/images/"),
      styles: path.resolve(__dirname, "../..", "src/styles/"),
      test: path.resolve(__dirname, "../..", "src/test/"),
      views: path.resolve(__dirname, "../..", "src/views/"),
      env: path.resolve(__dirname, "../..", "src/env.js"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../..", "build"),
    clean: true,
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../..", "public", "index.html"),
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "image/[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[hash][ext]",
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
