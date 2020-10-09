const crypto = require("crypto");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

// ============================================================================
const { assignments } = require("./pages.config");
// ============================================================================

const assignmentHTMLPlugins = assignments.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}/index.html`,
    filename: `${name}.html`,
    chunks: [`${name}`],
  });
});
const assignmentEntryPoints = assignments.reduce(
  (obj, name) => ({ ...obj, [name]: `./src/${name}/index.ts` }),
  {}
);

const stats = {
  assetsSort: "chunks",
  entrypoints: false,
  excludeAssets: /\.map$/,
  colors: true,
  version: false,
  hash: false,
  timings: false,
  cached: false,
  cachedAssets: false,
  chunkModules: false,
  chunks: false,
  entrypoints: false,
  modules: false,
};

// If we have collisions, I'll eat my socks
const hashCode = (value) => {
  return crypto.createHash("md5").update(value).digest("hex").slice(0, 12);
};

console.log("Your CPU fan sounds kinda quiet. Lemme fix that...\n\n");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "source-map",

  stats,

  devServer: {
    publicPath: "/",
    port: 3000,
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, "public"),
    stats,
  },

  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },

  entry: {
    home: "./src/home/index.ts",
    ...assignmentEntryPoints,
  },

  output: {
    pathinfo: true,
    filename: "static/js/[name].js",
    sourceMapFilename: "static/maps/[file].map[query]",
    chunkFilename: "static/js/[name].chunk.js",
    globalObject: "this",
  },

  optimization: {
    minimize: !isDevelopment,
    splitChunks: {
      chunks: "all",
      name(_module, chunks, cacheGroupKey) {
        const hashChunks = hashCode(chunks.join("-"));
        return `${cacheGroupKey}-${hashChunks}`;
      },
    },
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: { common: path.resolve(__dirname, "../common") },
    modules: [path.resolve(__dirname, "node_modules")],
  },

  module: {
    strictExportPresence: true,
    rules: [
      { test: /\.glsl$/, use: "raw-loader" },
      //   {
      //     test: /\.s[ac]ss$/,
      //     use: ["style-loader", "css-loader", "sass-loader"],
      //   },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/home/index.html",
      chunks: ["home"],
    }),
    ...assignmentHTMLPlugins,
  ],
};
