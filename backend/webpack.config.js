const path = require("path");

module.exports = {
  target: "node", // this will tell webpack to compile for a Node.js environment
  mode: "production", // we set the mode to production to minify the output
  entry: {
    app: ["./src/app.ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    clean: true,
  },
  optimization: {
    minimize: false, // we disable the minimization plugin to keep the phantombuster package comment directives
  },
};
