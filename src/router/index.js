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
import LabelManagement from '@/components/LiHun/LabelManagement'         // 标签管理页面
import DisplayRule from '@/components/LiHun/DisplayRule'         // 显示规则修改页面
import UsersRole from '@/components/users/UsersRole'  // 用户角色页面
import SearchCase from '@/components/SearchCase'   // 案例搜索
import WenJuan from '@/components/LiHun/WenJuan'         // 添加问卷页面
import UserSystem from '@/components/LiHun/UserSystem'         // 添加用户系统页面
import WenJuan1 from '@/components/LiHun/WenJuan1'         // 添加问卷测试页面
import ChuShi from '@/components/LiHun/ChuShi'         // 小问卷初始页面
import QueDing from '@/components/LiHun/QueDing'         // 确定初始页面
import ShengChengXieYi from '@/components/LiHun/ShengChengXieYi'         // 添加离婚协议书债务页面
import QiSuComplate from '@/components/QiSuZhuang/QiSuComplate'    // 起诉状生成页
import QiSuBasicInformation from '@/components/QiSuZhuang/QiSuBasicInformation'    // 起诉状基本信息填写
import DiaoChaQuZhengStart from '@/components/DiaoChaQuZhengRequest/DiaoChaQuZhengStart'    // 调查取证申请书初始化页面
import DiaoChaQuZhengBasic from '@/components/DiaoChaQuZhengRequest/DiaoChaQuZhengBasic'   // 调查取证申请书信息填写页
import DiaoChaQuZhengPersonalize from '@/components/DiaoChaQuZhengRequest/DiaoChaQuZhengPersonalize'  // 调查取证申请书个性化页面
import HunQianStart from '@/components/HunQianXieYi/HunQianStart' // 婚前协议小问卷
import HunQianBasic from '@/components/HunQianXieYi/HunQianBasic' // 婚前协议基本信息
import HunNeiStart from '@/components/HunNeiXieYi/HunNeiStart' // 婚内协议小问卷
import HunNeiBasic from '@/components/HunNeiXieYi/HunNeiBasic' // 婚内协议基本信息
import BaoQuanStart from '@/components/BaoQuanRequest/BaoQuanStart'    // 保全申请书初始化页面
import BaoQuanBasic from '@/components/BaoQuanRequest/BaoQuanBasic'   // 保全申请书信息填写页
import BaoQuanPersonalize from '@/components/BaoQuanRequest/BaoQuanPersonalize'  // 保全申请书个性化页面
import FuYangQuanBasic from '@/components/FuYangQuanQiSuZhuang/FuYangQuanBasic'   // 抚养权起诉状信息填写页
import FuYangQuanPersonalize from '@/components/FuYangQuanQiSuZhuang/FuYangQuanPersonalize'  // 抚养权起诉状个性化页面
import FuYangFeiBasic from '@/components/FuYangFeiQiSuZhuang/FuYangFeiBasic'   // 抚养费起诉状信息填写页
import FuYangFeiPersonalize from '@/components/FuYangFeiQiSuZhuang/FuYangFeiPersonalize'  // 抚养费起诉状个性化页面
import FenJiaXiChanBasic from '@/components/FenJiaXiChanQiSuZhuang/FenJiaXiChanBasic'   // 分家析产纠纷起诉状信息填写页
import FenJiaXiChanPersonalize from '@/components/FenJiaXiChanQiSuZhuang/FenJiaXiChanPersonalize'  // 分家析产纠纷起诉状个性化页面
import MinJianJieDaiBasic from '@/components/MinJianJieDaiQiSuZhuang/MinJianJieDaiBasic'   // 民间借贷起诉状信息填写页
import MinJianJieDaiPersonalize from '@/components/MinJianJieDaiQiSuZhuang/MinJianJieDaiPersonalize'  // 民间借贷起诉状个性化页面
import ZhengRenChuTingBasic from '@/components/ZhengRenChuTingRequest/ZhengRenChuTingBasic'   // 证人出庭作证申请书信息填写页
import ZhengRenChuTingPersonalize from '@/components/ZhengRenChuTingRequest/ZhengRenChuTingPersonalize'  // 证人出庭作证申请书个性化页面
import PingGuStart from '@/components/PingGuRequest/PingGuStart'    // 评估请书初始化页面
import PingGuBasic from '@/components/PingGuRequest/PingGuBasic'   // 评估请书信息填写页
import PingGuPersonalize from '@/components/PingGuRequest/PingGuPersonalize'  // 评估请书个性化页面
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
    // 标签管理
    {path: '/LabelManagement', name: 'LabelManagement', component: LabelManagement},
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
    // 生成离婚协议书页面
    {path: '/ShengChengXieYi', name: 'ShengChengXieYi', component: ShengChengXieYi},
    // 起诉状生成页
    {path: '/QiSuComplate', name: 'QiSuComplate', component: QiSuComplate},
    // 起诉状基本信息
    {path: '/QiSuBasicInformation', name: 'QiSuBasicInformation', component: QiSuBasicInformation},
    // 调查取证申请书初始化页面
    {path: '/DiaoChaQuZhengStart', name: 'DiaoChaQuZhengStart', component: DiaoChaQuZhengStart},
    // 调查取证申请书基本信息页面
    {path: '/DiaoChaQuZhengBasic', name: 'DiaoChaQuZhengBasic', component: DiaoChaQuZhengBasic},
    // 调查取证申请书个性化页面
    {path: '/DiaoChaQuZhengPersonalize', name: 'DiaoChaQuZhengPersonalize', component: DiaoChaQuZhengPersonalize},
    // 婚前协议小问卷
    {path: '/HunQianStart', name: 'HunQianStart', component: HunQianStart},
    // 婚前协议基本信息
    {path: '/HunQianBasic', name: 'HunQianBasic', component: HunQianBasic},
    // 婚内协议小问卷
    {path: '/HunNeiStart', name: 'HunNeiStart', component: HunNeiStart},
    // 婚内协议基本信息
    {path: '/HunNeiBasic', name: 'HunNeiBasic', component: HunNeiBasic},
    // 保全申请书初始化页面
    {path: '/BaoQuanStart', name: 'BaoQuanStart', component: BaoQuanStart},
    // 保全申请书基本信息页面
    {path: '/BaoQuanBasic', name: 'BaoQuanBasic', component: BaoQuanBasic},
    // 保全申请书个性化页面
    {path: '/BaoQuanPersonalize', name: 'BaoQuanPersonalize', component: BaoQuanPersonalize},
    // 抚养权基本信息页面
    {path: '/FuYangQuanBasic', name: 'FuYangQuanBasic', component: FuYangQuanBasic},
    // 抚养权个性化页面
    {path: '/FuYangQuanPersonalize', name: 'FuYangQuanPersonalize', component: FuYangQuanPersonalize},
    // 抚养费基本信息页面
    {path: '/FuYangFeiBasic', name: 'FuYangFeiBasic', component: FuYangFeiBasic},
    // 抚养费个性化页面
    {path: '/FuYangFeiPersonalize', name: 'FuYangFeiPersonalize', component: FuYangFeiPersonalize},
    // 分家析产基本信息页面
    {path: '/FenJiaXiChanBasic', name: 'FenJiaXiChanBasic', component: FenJiaXiChanBasic},
    // 分家析产个性化页面
    {path: '/FenJiaXiChanPersonalize', name: 'FenJiaXiChanPersonalize', component: FenJiaXiChanPersonalize},
    // 民间借贷基本信息页面
    {path: '/MinJianJieDaiBasic', name: 'MinJianJieDaiBasic', component: MinJianJieDaiBasic},
    // 民间借贷个性化页面
    {path: '/MinJianJieDaiPersonalize', name: 'MinJianJieDaiPersonalize', component: MinJianJieDaiPersonalize},
    // 证人出庭作证基本信息页面
    {path: '/ZhengRenChuTingBasic', name: 'ZhengRenChuTingBasic', component: ZhengRenChuTingBasic},
    // 证人出庭作证个性化页面
    {path: '/ZhengRenChuTingPersonalize', name: 'ZhengRenChuTingPersonalize', component: ZhengRenChuTingPersonalize},
    // 评估请书初始化页面
    {path: '/PingGuStart', name: 'PingGuStart', component: PingGuStart},
    // 评估基本信息页面
    {path: '/PingGuBasic', name: 'PingGuBasic', component: PingGuBasic},
    // 评估个性化页面
    {path: '/PingGuPersonalize', name: 'PingGuPersonalize', component: PingGuPersonalize},
    // 访问错误页面跳转到登录页面
    {path: '*',redirect: '/'}
  ]
})
