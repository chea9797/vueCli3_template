<template>
  <div class="index">
    <p @click.once="touch()">{{ date | dateFmt }}</p>
    <div id="box">
      <ul>
        <li v-for="item in 30" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "utils/request";

export default {
  name: "index",
  data() {
    return {
      date: null,
    };
  },
  methods: {
    touch() {
      alert(1);
      debugger;
      alert(2);
    },
  },
  mounted() {
    console.log("测试我被删除了没");
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
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
  #box {
    height: 500px;
    overflow-y: scroll;
    ul {
      height: auto;
      li {
        height: 50px;
        font-size: 30px;
        text-align: center;
        background-color: #eee;
        &:nth-of-type(even) {
          background-color: #ccc;
        }
      }
    }
  }
}
</style>
