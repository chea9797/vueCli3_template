const path = require("path");

//判断是否生产环境
const IS_PROD = process.env.NODE_ENV === "production" ? true : false;

function resolve(dir) {
  return path.join(__dirname, dir);
}

//引入删除项目console输出依赖包
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // 配置
  chainWebpack: (config) => {
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
  configureWebpack: (config) => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              warnings: false, // 若打包错误，则注释这行
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"],
            },
          },
          sourceMap: false,
          parallel: true, //多线程打包
        })
      );
      config.plugins = [...config.plugins, ...plugins];
      config.entry.app = ["babel-polyfill", "./src/main.js"]; //解决低版本兼容
    }
  },
  outputDir: process.env.VUE_APP_NAME, //输出文件目录
  assetsDir: "static", // 静态资源目录
  publicPath: IS_PROD
    ? `http://192.168.1.172:8087/c/gf?path=${process.env.VUE_APP_NAME}`
    : "./", // 编译后的地址，可以根据环境进行设置
  indexPath: "index.html", // 项目入口文件
  lintOnSave: false, // 是否开启编译时是否不符合eslint提示
  filenameHashing: !IS_PROD, //静态资源文件名中加入hash
  productionSourceMap: !IS_PROD,
  css: {
    extract: IS_PROD, //从js中提取css 开发环境会影响css热重载
    loaderOptions: {
      //移动端适配
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 120, // 设计稿宽度的1/10
            propList: ["*"],
          }),
          require("autoprefixer"), //自动添加浏览器兼容前缀
        ],
      },
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        data: `
               @import "@/assets/css/variable.scss"; 
               @import "@/assets/css/common.scss";
               @import "@/assets/css/mixin.scss";
              `,
      },
    },
  },
};
