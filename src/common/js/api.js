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
  baseLiHunURL = '',
  adminBaseURL, compBaseURL

if(host.indexOf('线上地址') > -1){
  //线上环境
  baseHost = environment.onLine
}else {
  //测试环境
  baseHost = environment.dev
}
baseURL = baseHost + 'jiali_api/v1/'
baseLiHunURL = baseHost + 'Questionnaire/v1/'
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
  // 查找用户基本信息
  usersSelect: baseURL + 'user/select',
  // 新增权限
  addPermission: baseURL + 'users/add_permission',
  // 删除权限
  deletePermission: baseURL + 'users/delete_permission',
  // 修改权限
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
  // 查询角色权限
  selectRolePermission: baseURL + 'users/select_role_permission/',
  // 上传列表页
  selectCaseLlist: baseURL + 'case/select_case_list',

  // 新增案件信息
  creatCase: baseURL + 'case/add',
  // 查询案件
  selectCase: baseURL + 'case/select_case',
  // 查询案件列表
  selectCaseList: baseURL + 'case/select_case_list',
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
  selectCaseType: baseURL + 'case_type/select',

  // 离婚配置
  // 新增问题
  addQuestion: baseLiHunURL + 'problem/add',
  // 查询问题
  selectQuestion: baseLiHunURL + 'problem/select',
  // 查询问题列表
  selectQuestionList: baseLiHunURL + 'problem/select',
  // 删除问题
  deleteQuestion: baseLiHunURL + 'problem/delete/',
  // 修改问题
  updateQuestion: baseLiHunURL + 'problem/update/',
  // 问题数组
  QuestionArr: baseLiHunURL + 'problem/created',
  // 添加选项
  addAnswer: baseLiHunURL + 'problem/add_answer/',
  // 删除选项
  deleteAnswer: baseLiHunURL + 'problem/delete_answer/',
  // 查询关系树
  selectTree: baseLiHunURL + 'ProblemQ/select_tree',
  // 模糊查询关联
  selectVague: baseLiHunURL + 'ProblemQ/select_vague',
  // 新增关联
  ProblemQAdd: baseLiHunURL + 'ProblemQ/add',
  // 新增关联条件
  addQpWhere: baseLiHunURL + 'ProblemQ/add_qp_where/',
  // 修改关联
  updateProblemQ: baseLiHunURL + 'ProblemQ/update/',
  // 修改层级 父类
  updateOrder: baseLiHunURL + 'ProblemQ/update_order',
  // 查询关联条件
  selectQpWhere: baseLiHunURL + 'ProblemQ/select_qp_where/',
  // 删除关联条件
  deleteQpWhere: baseLiHunURL + 'ProblemQ/delete_qp_where/',
  // 删除关联
  deleteProblemQ: baseLiHunURL + 'ProblemQ/delete/',
  // 查询单独问题
  selectOnlyQuestion: baseLiHunURL + 'problem/select_only/',

  // word
  // 查询组合规则tree结构
  wordSelectTree: baseLiHunURL + 'word/select_tree/',
  // 查询单独组合：
  wordSelect: baseLiHunURL + 'word/select/',
  // 查询组合规则
  wordSelectWord: baseLiHunURL + 'word/select_word',
  // 修改组合规则
  updateWord: baseLiHunURL + 'word/update_word/',
  // 新增组合规则
  addWord: baseLiHunURL + 'word/add_word',
  // 删除组合规则
  deleteWord: baseLiHunURL + 'word/delete_word/',
  // 添加word的json部分
  addWordJson: baseLiHunURL + 'word/addWordJson/',
  // 修改word的json部分
  updateWordJson: baseLiHunURL + 'word/updateWordJson/',
  // 删除word的json部分
  deleteWordJson: baseLiHunURL + 'word/deleteWordJson/',

  // 查询问卷基本信息
  returnQuestionnaireJson: baseLiHunURL + 'word/returnQuestionnaireJson/',
  // 用户添加问卷的内容
  userAddAnswer: baseLiHunURL + 'word/user_add_answer',
  // 重复问题+1 添加孩子房产等信息
  userAddSelectAnswer: baseLiHunURL + 'page/user_add_select_answer',
  // 重复问题-1 删除孩子房产等信息
  userDeleteSelectAnswer: baseLiHunURL + 'page/user_delete_select_answer',
  // 验证单独word
  verificationWord: baseLiHunURL + 'word/Verification_word/',
  // 验证单独word demo
  demoYanZheng: baseLiHunURL + 'word/demo_yanzheng/',
  // 生成数据
  outPutWord: baseLiHunURL + 'word/outputWord/',
  // 下载离婚协议书
  getWord: baseLiHunURL + 'page/get_word',
  // 问卷数组
  questionnaire: baseLiHunURL + 'questionnaire/created',
  // 查询问卷
  questionnaireSelect: baseLiHunURL + 'questionnaire/select',
  // 新增问卷
  addQuestionnaire: baseLiHunURL + 'questionnaire/add',
  // 修改问卷
  updateQuestionnaire: baseLiHunURL + "questionnaire/update/",
  // 删除问卷
  deleteQuestionnaire: baseLiHunURL + 'questionnaire/delete/',
  // 查找用户问卷
  selectUserQuestionnaire: baseLiHunURL + 'page/select_user_questionnaire',
  // 查找用户回收站
  selectUserDeleteQuestionnaire: baseLiHunURL + 'page/select_user_questionnaire',
  // 修改用户问卷
  userUpdateQuestionnaire: baseLiHunURL + 'page/user_update_questionnaire/',
  // 新增用户问卷
  userAddQuestionnaire: baseLiHunURL + 'page/user_add_questionnaire/'
}
export{
  apiUrl
}
