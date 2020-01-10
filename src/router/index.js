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
import QuestionManagement from '@/components/LiHun/QuestionManagement'         // 问题管理页面
import GuanLianManagement from '@/components/LiHun/GuanLianManagement'         // 关联管理页面
import ZuHeManagement from '@/components/LiHun/ZuHeManagement'         // 组合管理页面
import DisplayRule from '@/components/LiHun/DisplayRule'         // 显示规则修改页面
import UsersRole from '@/components/users/UsersRole'  // 用户角色页面
import SearchCase from '@/components/SearchCase'   // 案例搜索
import WenJuan from '@/components/LiHun/WenJuan'         // 添加问卷页面
import UserSystem from '@/components/LiHun/UserSystem'         // 添加用户系统页面
import WenJuan1 from '@/components/LiHun/WenJuan1'         // 添加问卷测试页面
import ChuShi from '@/components/LiHun/ChuShi'         // 小问卷初始页面
import QueDing from '@/components/LiHun/QueDing'         // 确定初始页面
import BasicInformation from '@/components/LiHun/BasicInformation'         // 添加离婚协议书双方基本信息页面HunYinStatus
import HunYinStatus from '@/components/LiHun/HunYinStatus'         // 添加离婚协议书婚姻情况页面
import ZiNv from '@/components/LiHun/ZiNv'         // 添加离婚协议书子女页面
import FangChan from '@/components/LiHun/FangChan'         // 添加离婚协议书房产页面
import CunKuan from '@/components/LiHun/CunKuan'         // 添加离婚协议书存款页面
import Car from '@/components/LiHun/Car'         // 添加离婚协议书车子页面
import LiCai from '@/components/LiHun/LiCai'         // 添加离婚协议书理财页面
import JiaDian from '@/components/LiHun/JiaDian'         // 添加离婚协议书家电页面
import BaoXian from '@/components/LiHun/BaoXian'         // 添加离婚协议书保险页面
import QiTaCaiChan from '@/components/LiHun/QiTaCaiChan'         // 添加离婚协议书其他财产页面
import ZhaiQuan from '@/components/LiHun/ZhaiQuan'         // 添加离婚协议书债权页面
import ZhaiWu from '@/components/LiHun/ZhaiWu'         // 添加离婚协议书债务页面
import ShengChengXieYi from '@/components/LiHun/ShengChengXieYi'         // 添加离婚协议书债务页面

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login', component: Login},
    {path: '/loginSuccess', name: 'loginSuccess', component: LoginSuccess},
    {path: '/CaseCourt', name: 'CaseCourt', component: CaseCourt},
    // 案件上传路由
    {path: '/CaseUpload', name: 'CaseUpload', component: CaseUpload},
    // 案件展示路由
    {path: '/FileList', name: 'FileList', component: FileList},
    // 修改案件基本信息
    {path: '/UpdateCase', name: 'UpdateCase', component: UpdateCase},
    // 完成页面
    {path: '/CaseCompleted', name: 'CaseCompleted', component: CaseCompleted},
    // 搜索查看完成页面
    {path: '/CaseCompletedView', name: 'CaseCompletedView', component: CaseCompletedView},
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
    // 显示规则页面
    {path: '/DisplayRule', name: 'DisplayRule', component: DisplayRule},
    // 搜索页面
    {path: '/SearchCase', name: 'SearchCase', component: SearchCase},
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
    // 基本信息页面
    {path: '/BasicInformation', name: 'BasicInformation', component: BasicInformation},
    // 婚姻情况页面
    {path: '/HunYinStatus', name: 'HunYinStatus', component: HunYinStatus},
    // 子女页面
    {path: '/ZiNv', name: 'ZiNv', component: ZiNv},
    // 房产页面
    {path: '/FangChan', name: 'FangChan', component: FangChan},
    // 存款页面
    {path: '/CunKuan', name: 'CunKuan', component: CunKuan},
    // 车子页面
    {path: '/Car', name: 'Car', component: Car},
    // 理财页面
    {path: '/LiCai', name: 'LiCai', component: LiCai},
    // 家电页面
    {path: '/JiaDian', name: 'JiaDian',component: JiaDian},
    // 保险页面
    {path: '/BaoXian', name: 'BaoXian', component: BaoXian},
    // 其他财产页面
    {path: '/QiTaCaiChan', name: 'QiTaCaiChan', component: QiTaCaiChan},
    // 债权页面
    {path: '/ZhaiQuan', name: 'ZhaiQuan', component: ZhaiQuan},
    // 债务页面
    {path: '/ZhaiWu', name: 'ZhaiWu', component: ZhaiWu},
    // 生成离婚协议书页面
    {path: '/ShengChengXieYi', name: 'ShengChengXieYi', component: ShengChengXieYi}

  ]
})
