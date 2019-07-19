import { stringify } from 'qs';
import request from '@/utils/request';
import { getLongToken } from '@/utils/longToken';

const axios = require('axios');

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}
export async function queryRule2(params) {
  return request(`/api/rule2?${stringify(params)}`);
}
export async function cloundQueryRule(params) {
  return request(`/apis/ruler2?${stringify(params)}`);
}

export async function removeRule2(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule2(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule2(params = {}) {
  return request(`/api/rule2?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return axios.post('/tvplus/api/v1/user/login', params);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getPowerManage(params) {
  return axios.post(
    '/tvplus/api/v1/user/page',
    { numPerPage: 1000 },
    {
      headers: { 'X-Long-Token': getLongToken() },
    }
  );
}
export async function addPowerManage(params) {
  return axios.post('/tvplus/api/v1/user/addUser', params, {
    headers: { 'X-Long-Token': getLongToken() },
  });
}

export async function getPowerManageById(params) {
  return axios.post(
    `/tvplus/api/v1/user/getOneUser?id=${params.id}`,
    {},
    {
      headers: { 'X-Long-Token': getLongToken() },
    }
  );
}
export async function getPowerManageByUsername(params) {
  return axios.post(
    `/tvplus/api/v1/user/getOneUserByUsername?username=${params.username}`,
    {},
    {
      headers: { 'X-Long-Token': getLongToken() },
    }
  );
}
export async function updatePowerManage(params) {
  return axios.post(`/tvplus/api/v1/user/updateUser`, params, {
    headers: { 'X-Long-Token': getLongToken() },
  });
}

export async function delPowerManage(params) {
  return axios.post(
    `/tvplus/api/v1/user/delete?id=${params.id}`,
    {},
    {
      headers: { 'X-Long-Token': getLongToken() },
    }
  );
}
