const fn = {};

//获取地址栏参数
fn.getUrlKey = function (name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
};

//导出
export default {
  install(vue) {
    vue.prototype.$fn = fn;
  },
};