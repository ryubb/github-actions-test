const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: { app: "./index.ts" },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 出力されるディレクトリの指定
    filename: "index.js", // 出力されるファイル名の指定
  },
};
