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

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "source-map",

  stats: {
    assetsSort: "chunks",
    version: false,
    entrypoints: false,
  },

  devServer: {
    publicPath: "/",
    port: 3000,
    hot: true,
    inline: true,
    contentBase: path.join(__dirname, "public"),
    stats: {
      assetsSort: "chunks",
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
    },
  },

  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },

  entry: assignmentEntryPoints,

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
      name: true,
    },
    // runtimeChunk: {
    //   name: (entrypoint) => `runtime-${entrypoint.name}`,
    // },
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
      chunks: ["main"],
    }),
    ...assignmentHTMLPlugins,
  ],
};
