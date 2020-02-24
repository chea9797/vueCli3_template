const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
//删除console
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
          parallel: true //多线程打包
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  outputDir: "dist", //输出文件目录
  assetsDir: "static", // 静态资源目录
  publicPath: "./", // 编译后的地址，可以根据环境进行设置
  indexPath: "index.html", // 项目入口文件
  lintOnSave: true, // 是否开启编译时是否不符合eslint提示
  filenameHashing: true, //静态资源文件名中加入hash
  productionSourceMap: process.env.NODE_ENV === "production" ? false : true,
  css: {
    extract: process.env.NODE_ENV === "production" ? true : false, //从js中提取css 开发环境会影响css热重载
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
