import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { notification } from 'antd';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority, getAuthority } from '@/utils/authority';
import { setLongToken } from '@/utils/longToken';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',
  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      localStorage.setItem('userName', payload.userName);
      localStorage.setItem('password', payload.password);
      setLongToken(response); // 保存本次请求的token
      const { data } = response;
      yield put({
        type: 'changeLoginStatus',
        payload: data,
      });

      // Login successfully
      // if (response.status === 'ok') {
      //   reloadAuthorized();
      //   const urlParams = new URL(window.location.href);
      //   const params = getPageQuery();
      //   let { redirect } = params;
      //   if (redirect && lastAuthority === currentAuthority) {
      //     const redirectUrlParams = new URL(redirect);
      //     if (redirectUrlParams.origin === urlParams.origin) {
      //       redirect = redirect.substr(urlParams.origin.length);
      //       if (redirect.match(/^\/.*#/)) {
      //         redirect = redirect.substr(redirect.indexOf('#') + 1);
      //       }
      //     } else {
      //       redirect = null;
      //     }
      //   } else {
      //     redirect = null;
      //   }
      //   // 根据接口获取的不同的登录帐号，跳转不同的首页地址。
      //   if (redirect) {
      //     yield put(routerRedux.replace(redirect));
      //   } else if (currentAuthority === 'admin') {
      //     yield put(routerRedux.replace('/powerIndex'));
      //   } else {
      //     yield put(routerRedux.replace('/customerIndex'));
      //   }
      // }

      if (data.errorCode === 0) {
        reloadAuthorized();
        // 默认跳转到的页面，线上可配置成首页。
        yield put(routerRedux.replace('/systemRole/list'));
      } else {
        notification.error({
          message: '提示信息',
          description: (data && data.errorMessage) || '系统错误',
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 统一为admin
      setAuthority('admin');
      localStorage.setItem('permissionVOS', JSON.stringify(payload.data.permissionVOS));
      return {
        ...state,
      };
    },
  },
};
