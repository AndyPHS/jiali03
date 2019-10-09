import {apiUrl} from '@/common/js/api.js'
import axios from 'axios'
import qs from 'qs'

// 验证码接口
export const verifyCode = params => {
  return axios({
    method: "GET",
    dataType: 'json',
    url: apiUrl.loginCode,
    data: qs.stringify(params)
  });
};
// 登录
export const requestLogin = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.login,
    data: params
  });
};

// 新增案件信息
export const creatCase = params => {
  return axios({
    method: 'POST',
    dataType: 'json',
    cache: true,
    async: false,
    timeout: 5000,
    processData: false,
    url: apiUrl.creatCase,
    headers: { Authorization: 'bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data:charset=UTF-8' },
    data: params
  })
};

// 修改案件基本信息
export const updateCaseData = params => {
  return axios({
    method: 'put',
    dataType: 'json',
    url: apiUrl.updateCase + '/' + localStorage.getItem('id'),
    headers: {Authorization: 'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询案件
export const selectCaseData = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCase + "/" + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 文件上传列表接口
export const fileList = params => {
  return axios({
    method: "GET",
    dataType: 'json',
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    url: apiUrl.selectCaseLlist+'?page='+params.page,
    data:params
  });
};

// 新增案由
export const addCaseAction = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.addCaseAction + "/" + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询案由
export const selectCaseAction = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseAction,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};

// 新增法院信息
export const creatCaseCourtMsg = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.creatCaseCourtMsg,
    data: qs.stringify(params)
  });
};
// 修改法院信息
export const updateCaseCourtMsg = params => {
  alert(params)
  // return axios({
  //   method: "put",
  //   dataType: 'json',
  //   url: apiUrl.updateCaseCourtMsg+params.cpid,
  //   data: qs.stringify(params)
  // });
};

// 删除法院信息
export const deleteCaseCourtMsg = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.deleteCaseCourtMsg+params.cpid,
  });
};

// 查询法庭信息
export const getCaseCourtMsg = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.getCaseCourtMsg,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};

// 查询标签
export const selectCaseLable = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseLable,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
//查询法院人员
export const getCourtPersonnels = params => {

  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseCourtPersonnel+params.courtId,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')}
  });
};


//新增法院人员
export const addCourtPersonnels = params => {

  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addCaseCourtPersonnel,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};


//修改法院人员
export const updateCourtPersonnels = params => {

  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCaseCourtPersonnel+params.cpid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};


//删除法院人员
export const delCourtPersonnels = params => {

  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteCaseCourtPersonnel+params.cpid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')}
  });
};


// 查询律所信息
export const getCourtData = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseLawyerOffice,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};

// 查询律师
export const getLawyerData = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseLawyer+params.loid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')}
  });
};


// 新增律所
export const addLawyerOffice = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addCaseLawyerOffice,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data:params
  });
};
// 修改律所
export const updateLawyerOffice = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCaseLawyerOffice+params.loid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data:params
  });
};

// 新增律师
export const addLawyer = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addCaseLawyer,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data:params
  });
};

