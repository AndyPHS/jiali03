import {apiUrl} from '@/common/js/api.js'
import axios from 'axios'
import qs from 'qs'

// 修改手机号
export const updatePhone = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePhone,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改用户名基本信息updateUserName
export const updateUserName = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updateUserName,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 发送手机验证码
export const phoneCode = params => {
	return axios({
	  method: 'post',
	  dataType: 'json',
	  url: apiUrl.phoneCode,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
	  data: params
	});
};
// 发送邮件验证码
export const sendEmail = params => {
	return axios({
	  method: 'post',
	  dataType: 'json',
	  url: apiUrl.sendEmail,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
	  data: params
	});
};
// 手机修改密码
export const updatePasswordPhone = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePasswordPhone,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增用户
export const addUser = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.addUser,
    data: params
  });
};
// 更新用户头像
export const uploadUserPhoto = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.uploadUserPhoto,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 登录
export const frontLogin = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.frontLogin,
    data: params
  });
};
// 修改邮件
export const updateUserEmail = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updateUserEmail,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 邮件修改密码
export const updatePasswordEmail = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePasswordEmail,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};



// 验证码接口
export const verifyCode = params => {
  return axios({
    method: "GET",
    dataType: 'json',
    url: apiUrl.loginCode,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 登录
export const requestLogin = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.login,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 删除用户
export const deleteUser = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteUser + '/' + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 修改用户
export const updateUser = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateUser + '/' + localStorage.getItem('userId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询用户
export const selectUser = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUser+'?page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
