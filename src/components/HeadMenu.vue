<template>
    <div>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <!--<el-menu-item index="1">用户管理</el-menu-item>-->
            <el-submenu index="1">
                <template slot="title">用户管理</template>
                <el-menu-item index="1-1"><router-link  to="Users">管理员列表</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link  to="UsersPermission">权限列表</router-link></el-menu-item>
                <el-menu-item index="1-3"><router-link  to="UsersRole">角色列表</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="2" collapse-transition>
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1"><router-link to="CaseUpload">上传案件</router-link></el-menu-item>
                <el-menu-item index="2-2"><router-link to="FileList">案件列表</router-link></el-menu-item>
                 <el-menu-item index="2-3" class="hidden"><router-link to="CaseCourt">法院管理</router-link></el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><router-link to="FileList">案件列表</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="SearchCase">案例检索</router-link></el-menu-item>
            <el-menu-item index="5"><router-link to="QuestionManagement">问题管理</router-link></el-menu-item>
            <el-menu-item index="6"><router-link to="GuanLianManagement">关联管理</router-link></el-menu-item>
            <el-menu-item index="7"><router-link to="DisplayRule">组合管理</router-link></el-menu-item>
            <el-menu-item index="8"><router-link to="ChuShi">问卷初始化</router-link></el-menu-item>
            <el-menu-item index="9"><router-link to="BasicInformation">填写问卷</router-link></el-menu-item>
        </el-menu>
        <div class="container mx-auto">
            <dl class="text-left flex items-center py-2">
                <dt>
                    <img class="w-1/2" src="@/assets/images/logo.png" alt="">
                </dt>
                <dd class="ml-2">
                    <h2 class="text-xl text-orange-500">北京家理律师事务所</h2>

                </dd>
                <dd class="ml-3">
                    <h2>你好！{{user}}</h2>
                </dd>
            </dl>
        </div>
    </div>

</template>

<script>
  export default {
    name: 'HeadMenu.vue',
    data() {
      return {
        activeIndex: '1',
        user: localStorage.getItem('name')
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
