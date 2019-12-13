const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
//删除console
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
  // 配置
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("utils", resolve("src/utils"))
      .set("static", resolve("src/static"))
      .set("store", resolve("src/store"))
      .set("views", resolve("src/views"));
    //压缩文件
    config.optimization.minimize(true);
    //分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });
  },
  //删除控制台输出
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              warnings: false, // 若打包错误，则注释这行
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"]
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [...config.plugins, ...plugins];
      // gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      );
    }
  },
  assetsDir: "assets", // 静态文件目录
  publicPath: "./", // 编译后的地址，可以根据环境进行设置
  lintOnSave: true, // 是否开启编译时是否不符合eslint提示
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        data: `
               @import "@/assets/css/variable.scss"; 
               @import "@/assets/css/common.scss";
               @import "@/assets/css/mixin.scss";
              `
      }
    }
  }
};
