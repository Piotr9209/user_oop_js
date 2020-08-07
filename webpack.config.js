const path = require("path");

module.exports = {
  entry: "./src/user.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  mode: "development", // lub "production"
  devtool: "source-map",
  watch: true,
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};


//wywalic css/scss. dodaj TS, uwzglednic pliki jest, by pliki testowe by nie byly bundlowane