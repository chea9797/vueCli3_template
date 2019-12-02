<template>
  <div class="index">
    <p>HelloWorld</p>
  </div>
</template>

<script>
// @ is an alias to /src
import request from "utils/request";
import "../mock";

export default {
  name: "index",
  data() {
    return {
      mockData: ""
    };
  },
  mounted() {
    request({
      url: "/api/users",
      methods: "get"
    }).then(res => {
      console.log(res);
      this.mockData = res;
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.index {
  width: 100%;
  height: 100%;
  background-color: pink;
  p {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100px;
    text-align: center;
    font-size: 26px;
  }
}
</style>
