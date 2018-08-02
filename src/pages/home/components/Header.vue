<template>
  <div class="head clearfix">
    <div class="head-left">返回</div>
    <div class="head-input">内容</div>
    <div class="head-right">城市</div>
  </div>
</template>
<script>
  export default {
    name: 'HomeHeader'
  }
</script>
<style scoped lang="less">
  @import "../../../assets/less/skin.less";
  .head{
    height: 86rem/@rem;
    line-height: 86rem/@rem;
    background-color: #00bcd4;
    color: #fff;
    font-size: 28rem/@rem;
    display: flex;
    .head-left{
      width: 128rem/@rem;
      float: left;
      height: 86rem/@rem;
    }
    .head-input{
      float: left;
      flex: 1;
      margin-top: 12rem/@rem;
      height: 64rem/@rem;
      background-color: #fff;
      -webkit-border-radius: 10rem/@rem;
      -moz-border-radius: 10rem/@rem;
      border-radius: 10rem/@rem;
    }
    .head-right{
      float: right;
      width: 124rem/@rem;
      height: 86rem/@rem;
    }
  }
</style>
