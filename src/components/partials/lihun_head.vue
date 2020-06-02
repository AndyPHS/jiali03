<template>
  <div class="head flex items-center">
    <div class="w flex justify-between">
      <div class="flex justify-between items-center">
        <img class="mr-3" src="../../assets/images/lihun/logo.png" alt="">
        <el-divider direction="vertical"></el-divider>
        <span class="log_r">北京家理律师事务所出品</span>
      </div>
      <div class="flex justify-between items-center">
        <ul class="nav flex justify-around items-center">
          <li>首页</li>
          <li>离婚知识</li>
          <li>定制我的离婚协议书</li>
          <li>家理律所官网</li>
        </ul>
        <div class="loginBox flex justify-around items-center">
          <span class="cursor-pointer">登录</span>
          <el-divider direction="vertical"></el-divider>
          <span class="cursor-pointer">注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'lihun_head'
  }
</script>

<style scoped>
  .w{width: 1200px; margin: 0 auto;}
  .head{height: 92px;background-color: #fff;}
  .log_r{color:#878787;font-size: 14px;}
  .nav{width: 530px;font-size: 18px;}
  .nav li:hover{color:#547ce0;cursor: pointer;}
  .loginBox{width: 99px; height: 24px;border:1px solid #547ce0;border-radius: 12px;margin-left: 38px;padding:0 10px;}
  .loginBox span{font-size: 14px; color:#547ce0;cursor: pointer;}
</style>
