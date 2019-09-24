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
    method: "post",
    dataType: 'json',
    url: apiUrl.login,
    data: params
  });
};

// 新增案件信息
export const creatCase = params => {
  return axios({
    method: "post",
    dataType: 'json',
    cache:false,
    timeout: 5000,
    contentType: false,
    url: apiUrl.creatCase,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 修改案件基本信息
export const updateCaseData = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCase + "/" + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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
    // url: apiUrl.login+'?token=localStorage.getItem(\'token\')',
    // headers:localStorage.getItem('token'),
    url: apiUrl.selectCaseLlist,
    data: params
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
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCaseCourtMsg+params.cpid,
    data: qs.stringify(params)
  });
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
