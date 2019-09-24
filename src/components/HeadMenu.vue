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
                <el-menu-item index="2-1">管理员列表</el-menu-item>
                <el-menu-item index="2-2">权限列表</el-menu-item>
                <el-menu-item index="2-3">角色列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2" collapse-transition>
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1"><router-link to="CaseUpload">上传案件</router-link></el-menu-item>
                <el-menu-item index="2-2"><router-link to="FileList">案件列表</router-link></el-menu-item>
                <!--<el-menu-item index="2-3"></el-menu-item>-->
                <!--<el-submenu index="2-4">-->
                    <!--<template slot="title">选项4</template>-->
                    <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
                    <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
                    <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
                <!--</el-submenu>-->
            </el-submenu>
            <el-menu-item index="3"><router-link to="FileList">案件列表</router-link></el-menu-item>
            <el-menu-item index="4">案例检索</el-menu-item>
        </el-menu>
    </div>

</template>

<script>
  export default {
    name: 'HeadMenu.vue',
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
