import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import LoginSuccess from '@/components/loginSuccess'
import FileList from '@/components/FileList'   // 案例展示列表页面
import HeadMenu from '@/components/HeadMenu'  // 添加头部导航按钮
import UpdateCase from '@/components/UpdateCase' // 修改案件基本信息
import ArrangementCase from '@/components/ArrangementCase'  // 整理案件样式页面
import Users from '@/components/users/Users'  // 用户页面
import UsersPermission from '@/components/users/UsersPermission'  // 用户权限页面
import QuestionManagement from '@/components/LiHun/QuestionManagement'         // 问题管理页面
import GuanLianManagement from '@/components/LiHun/GuanLianManagement'         // 关联管理页面
import ZuHeManagement from '@/components/LiHun/ZuHeManagement'         // 组合管理页面
import LabelManagement from '@/components/LiHun/LabelManagement'         // 标签管理页面
import DisplayRule from '@/components/LiHun/DisplayRule'         // 显示规则修改页面
import UsersRole from '@/components/users/UsersRole'  // 用户角色页面
import WenJuan from '@/components/LiHun/WenJuan'         // 添加问卷页面
const UserSystem = resolve => require(['@/components/LiHun/UserSystem'], resolve)  // 添加用户系统页面
import WenJuan1 from '@/components/LiHun/WenJuan1'         // 添加问卷测试页面
import ChuShi from '@/components/LiHun/ChuShi'         // 小问卷初始页面
import QueDing from '@/components/LiHun/QueDing'         // 确定初始页面
import BasicInformation from '@/components/LiHun/BasicInformation'         // 基本信息填写页面
import ShengChengXieYi from '@/components/LiHun/ShengChengXieYi'         // 添加离婚协议书债务页面
import NewWenJuan from '@/components/NewWenJuan' // 新增问卷测试
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login', component: Login},
    {path: '/loginSuccess', name: 'loginSuccess', component: LoginSuccess},
    // 案件展示路由
    {path: '/FileList', name: 'FileList', component: FileList},
    // 修改案件基本信息
    {path: '/UpdateCase', name: 'UpdateCase', component: UpdateCase},
    // 导航列表
    {path: '/HeadMenu', name: 'HeadMenu', component: HeadMenu},
    // 整理案件样式页面
    {path: '/ArrangementCase', name: 'ArrangementCase', component: ArrangementCase},
    // 用户列表
    {path: '/Users', name: 'Users', component: Users},
    // 用户权限列表
    {path: '/UsersPermission', name: 'UsersPermission', component: UsersPermission},
    // 用户角色列表
    {path: '/UsersRole', name: 'UsersRole', component: UsersRole},
    // 问题管理页面
    {path: '/QuestionManagement', name: 'QuestionManagement', component: QuestionManagement},
    // 关联管理
    {path: '/GuanLianManagement', name: 'GuanLianManagement', component: GuanLianManagement},
    // 组合管理
    {path: '/ZuHeManagement', name: 'ZuHeManagement', component: ZuHeManagement},
    // 标签管理
    {path: '/LabelManagement', name: 'LabelManagement', component: LabelManagement},
    // 显示规则页面
    {path: '/DisplayRule', name: 'DisplayRule', component: DisplayRule},
    // 问卷页面
    {path: '/WenJuan', name: 'WenJuan', component: WenJuan},
    // 用户系统
    {path: '/UserSystem', name: 'UserSystem', component: UserSystem},
    // 问卷测试页面
    {path: '/WenJuan1', name: 'WenJuan1', component: WenJuan1},
    // 小问卷 初始页面
    {path: '/ChuShi', name: 'ChuShi', component: ChuShi},
    // 确定初始页面
    {path: '/QueDing', name: 'QueDing', component: QueDing},
	// 基本信息填写页面
	{path: '/BasicInformation', name: 'BasicInformation', component: BasicInformation},
    // 生成离婚协议书页面
    {path: '/ShengChengXieYi', name: 'ShengChengXieYi', component: ShengChengXieYi},
	{path: '/NewWenJuan', name: 'NewWenJuan', component: NewWenJuan},
    // 访问错误页面跳转到登录页面
    {path: '*',redirect: '/'}
  ]
})
