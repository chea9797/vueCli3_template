const path = require("path");

//判断是否生产环境
const IS_PROD = process.env.NODE_ENV === "production" ? true : false;

//是否pad端H5应用
const IS_PAD = JSON.parse(process.env.VUE_APP_ISPAD);

function resolve(dir) {
  return path.join(__dirname, dir);
}

//引入删除项目console输出依赖包
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  chainWebpack: (config) => {
    /* 添加分析工具 */
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
      config.plugins.delete('prefetch')
    }

    //代码分离
    config
      .optimization.splitChunks({
        chunks: 'all', //async异步代码分割 initial同步代码分割 all同步异步分割都开启
        minSize: 30000, //字节 引入的文件大于30kb才进行分割
        maxSize: 50000, //尝试将大于50kb的文件拆分成n个50kb的文件
        minChunks: 1, //模块引入次数
        automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
        name: true, //缓存组里面的filename生效，覆盖默认命名
        cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
          vendors: { //自定义打包模块
            filename: 'vendors.js',
            test: resolve('./static'),
            priority: 20, //优先级，先打包到哪个组里面，值越大，优先级越高
          },
          vantUI: {
            name: 'chunk-vnatUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          },
        }
      })

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
  //配置
  configureWebpack: (config) => {
    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              warnings: false, // 若打包错误，则注释这行
              drop_console: false,
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
  devServer: {
    // host: '192.168.4.118',
    port: 2233,
    /* proxy: {
      //配置跨域
      "/api": {
        target: "http://192.168.4.212:8086", //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: false, //是否使用https
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "",
        },
      },
    }, */
  },
  outputDir: process.env.VUE_APP_NAME, //输出文件目录
  assetsDir: "static", // 静态资源目录
  publicPath: IS_PAD ?
    `http://192.168.1.172:8087/c/gf?path=${process.env.VUE_APP_NAME}` : "./", // 编译后的地址，可以根据环境进行设置
  indexPath: "index.html", // 项目入口文件
  lintOnSave: false, // 是否开启编译时是否不符合eslint提示
  filenameHashing: !IS_PAD, //静态资源文件名中加入hash
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
        prependData: `
               @import "@/assets/css/variable.scss";
               @import "@/assets/css/common.scss";
               @import "@/assets/css/mixin.scss";
              `,
      },
    },
  },
};