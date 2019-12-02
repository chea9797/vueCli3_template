const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //删除console
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
    // 用cdn方式引入
    /* config.externals({
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios"
    }); */
  },
  //删除控制台输出
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    }
  },
  assetsDir: "assets", // 静态文件目录
  publicPath: "./", // 编译后的地址，可以根据环境进行设置
  lintOnSave: true, // 是否开启编译时是否不符合eslint提示
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
