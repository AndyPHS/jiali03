import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import LoginSuccess from '@/components/loginsuccess'
import CaseCourt from '@/components/CaseCourt'
import CaseUpload from '@/components/CaseUpload'   // 案例上传页面
import CaseUploadNew from '@/components/CaseUploadNew'   // 案例上传页面
import FileList from '@/components/FileList'   // 案例展示列表页面
import CaseCompleted from '@/components/CaseCompleted'  // 案件信息填写页面
import HeadMenu from '@/components/HeadMenu'  // 添加头部导航按钮
import UpdateCase from '@/components/UpdateCase' // 修改案件基本信息
// import HelloWorld from '@/components/HelloWorld'

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
    {
      path: '/CaseUploadNew',
      name: 'CaseUploadNew',
      component: CaseUploadNew
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
    {
      path: '/CaseCompleted',
      name: 'CaseCompleted',
      component: CaseCompleted
    },
    {
      path: '/HeadMenu',
      name: 'HeadMenu',
      component: HeadMenu
    }
  ]
})
