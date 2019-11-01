import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import LoginSuccess from '@/components/loginSuccess'
import CaseCourt from '@/components/CaseCourt'
import CaseUpload from '@/components/CaseUpload'   // 案例上传页面
import FileList from '@/components/FileList'   // 案例展示列表页面
import CaseCompleted from '@/components/CaseCompleted'  // 案件信息填写页面
import CaseCompletedView from '@/components/CaseCompletedView'  // 搜索案件信息填写页面
import HeadMenu from '@/components/HeadMenu'  // 添加头部导航按钮
import UpdateCase from '@/components/UpdateCase' // 修改案件基本信息
import ArrangementCase from '@/components/ArrangementCase'  // 整理案件样式页面
import Users from '@/components/users/Users'  // 用户页面
import UsersPermission from '@/components/users/UsersPermission'  // 用户权限页面
import UsersRole from '@/components/users/UsersRole'  // 用户角色页面
import SearchCase from '@/components/SearchCase'   // 案例搜索
import WenJuan from '@/components/WenJuan'         // 添加问卷测试页面

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/loginSuccess',
      name: 'loginSuccess',
      component: LoginSuccess
    },
    {
      path: '/CaseCourt',
      name: 'CaseCourt',
      component: CaseCourt
    },
    // 案件上传路由
    {
      path: '/CaseUpload',
      name: 'CaseUpload',
      component: CaseUpload
    },
    // 案件展示路由
    {
      path: '/FileList',
      name: 'FileList',
      component: FileList
    },
    // 修改案件基本信息
    {
      path: '/UpdateCase',
      name: 'UpdateCase',
      component: UpdateCase
    },
    // 完成页面
    {
      path: '/CaseCompleted',
      name: 'CaseCompleted',
      component: CaseCompleted
    },
    // 搜索查看完成页面
    {
      path: '/CaseCompletedView',
      name: 'CaseCompletedView',
      component: CaseCompletedView
    },
    // 导航列表
    {
      path: '/HeadMenu',
      name: 'HeadMenu',
      component: HeadMenu
    },
    // 整理案件样式页面
    {
      path: '/ArrangementCase',
      name: 'ArrangementCase',
      component: ArrangementCase
    },
    // 用户列表
    {
      path: '/Users',
      name: 'Users',
      component: Users
    },
    // 用户权限列表
    {
      path: '/UsersPermission',
      name: 'UsersPermission',
      component: UsersPermission
    },
    // 用户角色列表
    {
      path: '/UsersRole',
      name: 'UsersRole',
      component: UsersRole
    },
    // 搜索页面
    {
      path: '/SearchCase',
      name: 'SearchCase',
      component: SearchCase
    },
    // 问卷页面
    {
      path: '/WenJuan',
      name: 'WenJuan',
      component: WenJuan
    }
  ]
})
