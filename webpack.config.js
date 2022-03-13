const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: { app: "./index.js" },
  resolve: {
    fallback: {
      os: false,
      path: false,
      http: false,
      https: false,
      assert: false,
      util: false,
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 出力されるディレクトリの指定
    filename: "index.js", // 出力されるファイル名の指定
  },
};
