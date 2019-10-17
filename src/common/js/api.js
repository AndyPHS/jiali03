/**
 * api接口统一管理
 */

// import { get, post } from './http'
// http://www.baiodu.com/api/v1/users/my_address/address_edit_before
// 环境配置
var environment = {
  onLine: "线上地址",
  // dev:"测试环境地址",
  dev: '/',
  devOfflin:"http://192.168.1.242/h5"
}
// 接口前缀
var host = location.host,
  baseHost = '',
  baseURL = '',
  adminBaseURL, compBaseURL

if(host.indexOf('线上地址') > -1){
  //线上环境
  baseHost = environment.onLine
}else {
  //测试环境
  baseHost = environment.dev
}
baseURL = baseHost
//接口集合
const apiUrl = {
  // 登录
  login: baseURL + 'login/login',
  // 登录验证
  loginCode: baseURL + 'login/login_code',
  // 提交注册
  register: baseURL + 'users/systemRegister',
  // 新增用户
  addUsers: baseURL + 'users/add_user',
  // 删除用户
  deleteUser: baseURL + 'users/delete_user/',
  // 修改用户
  updateUser: baseURL + 'users/update_user',
  // 查找用户
  selectUser: baseURL + 'users/select_user',
  // 查找用户角色
  selectUserRoles: baseURL + 'users/select_user_roles',
  // 新增权限
  addPermission: baseURL + 'users/add_permission',
  // 删除权限
  deletePermission: baseURL + 'users/delete_permission',
  // 修改权限s
  updatePermission: baseURL + 'users/update_permission',
  // 查询权限
  selectPermission: baseURL + 'users/select_permission',
  // 添加角色
  addUsersRole: baseURL + 'users/add_role',
  // 删除角色
  deleteUserRole: baseURL + 'users/delete_role',
  // 修改角色
  updateUserRole: baseURL + 'users/update_role',
  // 查询角色
  selectUserRole: baseURL + 'users/select_role',

  // 上传列表页
  selectCaseLlist: baseURL + 'case/select_case_list',

  // 新增案件信息
  creatCase: baseURL + 'case/add',
  // 查询案件
  selectCase: baseURL + 'case/select_case',
  // 修改案件基本信息
  updateCase: baseURL + 'case/update_case_data',
  // 新增案由
  addCaseAction: baseURL + 'case_action/add',
  // 获取案由
  selectCaseAction: baseURL + 'case_action/select',
  // 新增法院信息
  creatCaseCourtMsg: baseURL + 'case_court/create',
  // 获取法院信息
  getCaseCourtMsg: baseURL + 'case_court/select',
  // 提交法院信息
  addCaseCourtMsg: baseURL + 'case_court/add',
  // 删除法院信息
  deleteCaseCourtMsg: baseURL + 'case_court/delete/',
  // 修改法院信息
  updateCaseCourtMsg: baseURL + 'case_court/update/{$courtId}',
  // 新增法院人员信息
  addCaseCourtPersonnel: baseURL + 'case_court_personnel/add/',
  // 删除法院人员信息
  deleteCaseCourtPersonnel: baseURL + 'case_court_personnel/delete/',
  // 修改法院人员信息
  updateCaseCourtPersonnel: baseURL + 'case_court_personnel/update/',
  // 获取法院人员信息
  selectCaseCourtPersonnel: baseURL + 'case_court_personnel/select/',
  // 新增标签
  addCaseLable: baseURL + 'case_label/add',
  // 删除标签
  deleteCaseLable: baseURL + 'case_label/delete/{id}',
  // 修改标签
  updateCaseLable: baseURL + 'case_label/update/{id}',
  // 查找标签
  selectCaseLable: baseURL + 'case_label/select',
  // 新增律师信息
  addCaseLawyer: baseURL + 'case_lawyer/add',
  // 删除律师信息
  deleteCaseLawyer: baseURL + 'case_lawyer/delete/{$lid}',
  // 修改律师信息
  updateCaseLawyer: baseURL + 'case_lawyer/update/{$lid}',
  // 查看律师信息
  selectCaseLawyer: baseURL + 'case_lawyer/select/',
  // 新增律所信息
  addCaseLawyerOffice: baseURL + 'case_lawyer_office/add',
  // 删除律所信息
  deleteCaseLawyerOffice: baseURL + 'case_lawyer_office/delete{$loid}',
  // 修改律所信息
  updateCaseLawyerOffice: baseURL + 'case_lawyer_office/update/',
  // 查看律所信息
  selectCaseLawyerOffice: baseURL + 'case_lawyer_office/select',
  // 新增案件类型
  addCaseType: baseURL + 'case_type/add',
  // 删除案件类型
  deleteCaseType: baseURL + 'case_type/delete/{id}',
  // 修改案件类型
  updateCaseType: baseURL + 'case_type/update',
  // 查找案件类型
  selectCaseType: baseURL + 'case_type/select'
}
export{
  apiUrl
}
