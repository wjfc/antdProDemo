import { routerRedux } from 'dva/router';
import { message, notification } from 'antd';

import { setLongToken } from '@/utils/longToken';
import {
  getPowerManage,
  getPowerManageById,
  updatePowerManage,
  addPowerManage,
  delPowerManage,
  getPowerManageByUsername,
} from '@/services/api';

export default {
  namespace: 'manage',

  state: {},

  effects: {
    *getPowerManage({ payload }, { call, put }) {
      const response = yield call(getPowerManage, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      if (data.errorCode === 0) {
        yield put({
          type: 'save',
          payload: data,
        });
      } else if (data.errorCode === 100000) {
        yield put(routerRedux.replace('/user/login'));
      } else {
        notification.error({
          message: '提示信息',
          description: (data && data.errorMessage) || '系统错误',
        });
      }
    },
    *getPowerManageByUsername({ payload }, { call, put }) {
      const response = yield call(getPowerManageByUsername, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      if (data.errorCode === 0) {
        yield put({
          type: 'save',
          payload: data,
        });
      } else if (data.errorCode === 100000) {
        yield put(routerRedux.replace('/user/login'));
      } else {
        notification.error({
          message: '提示信息',
          description: (data && data.errorMessage) || '系统错误',
        });
      }
    },
    *getPowerManageById({ payload }, { call, put }) {
      const response = yield call(getPowerManageById, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      yield put({
        type: 'saveId',
        payload: data,
      });
    },
    *updatePowerManage({ payload, callback }, { call, put }) {
      if (payload.password == '') {
        delete payload.password;
      }
      const response = yield call(updatePowerManage, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      if (data.errorCode === 0) {
        notification.error({
          message: '提示信息',
          description: '更新成功',
        });
      } else if (data.errorCode === 100000) {
        yield put(routerRedux.replace('/user/login'));
      } else {
        notification.error({
          message: '提示信息',
          description: (data && data.errorMessage) || '系统错误',
        });
      }
      if (callback) callback(response);
    },
    *addPowerManage({ payload, callback }, { call, put }) {
      const response = yield call(addPowerManage, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      if (data.errorCode === 0) {
        notification.success({
          message: '提示信息',
          description: '提交成功',
        });
      } else if (data.errorCode === 100000) {
        yield put(routerRedux.replace('/user/login'));
      } else {
        notification.error({
          message: '提示信息',
          description: (data && data.errorMessage) || '系统错误',
        });
      }
      if (callback) callback(data);
    },
    *delPowerManage({ payload, callback }, { call, put }) {
      const response = yield call(delPowerManage, payload);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;

      if (data.errorCode === 0) {
        notification.success({
          message: '提示信息',
          description: '删除成功',
        });
        if (callback) callback(data);
      } else if (data.errorCode === 100000) {
        yield put(routerRedux.replace('/user/login'));
      } else {
        notification.error({
          message: '提示信息',
          description: (data && data.errorMessage) || '系统错误',
        });
      }
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveId(state, action) {
      return {
        ...state,
        selectData: action.payload,
      };
    },
  },
};
