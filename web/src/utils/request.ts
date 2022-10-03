// import qs from 'qs';
import { message } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
//处理promise和fetch的兼容性以及引入
require('es6-promise').polyfill();
require('isomorphic-fetch');
import { timeoutPromise } from './utils';
import route from '@/config';
let timeout = 60000; // 请求超时时间
let controller;
//处理get请求，传入参数对象拼接
let formatUrl = (obj) => {
  let params: any = Object.values(obj).reduce(
    (a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&`,
    '?'
  );
  return params.substring(0, params.length - 1);
};

//response 转化
function parseJSON(response) {
  return response.json();
}
function parseBlob(response) {
  return response.blob();
}
function getRouteMap() {
  const storageItemName = `el_routemaps_${process.env.REACT_APP_DOMAIN_NAME}`;
  let routemap = JSON.parse(sessionStorage.getItem(storageItemName));
  if (routemap) {
    return routemap;
  } else {
    routemap = new Object();
    function generateRoute(route) {
      route.map((v) => {
        if (v.path) {
          routemap[v.name] = v.path;
        }
        if (v.routes) {
          generateRoute(v.routes);
        }
      });
    }
    generateRoute(route);
    sessionStorage.setItem(storageItemName, JSON.stringify(routemap));
    return routemap;
  }
}
let Fetch = (url, option: any = {}, signal) => {
  option.headers = option.headers || {};
  option.headers['Authorization'] = `${window.localStorage.getItem(
    'Authorization'
  )}`;
  const routemap = getRouteMap();

  for (let i in routemap) {
    if (pathToRegexp(routemap[i]).test(window.location.pathname)) {
      option.headers['RouteKey'] = i;
    }
  }
  // option.headers['Authorization'] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJlM2E2YjUzNzQ1YWE0ZjQwODZmMTIyMzZhNGJjOTIwNCIsImF1dGgiOiIwMSxhZG1pbiIsInVzZXJpZCI6MzE5ODMzMDQ0ODE0MjY2MzY4LCJzdWIiOiJhZG1pbiJ9.m9SuHmzXHrhx180bCuFlaCRl2QWYX8JPqr6RJY_nzCu-PMszIR_bZ5rPCQYxdTj3ZaMOxYRa8rfe0o8EbwSndw"
  const m = (option.method || '').toLocaleLowerCase();
  // get query format
  if (m === 'get') {
    if (option.query) {
      url = url + formatUrl(option.query);
    }
  }
  //对非get类请求头和请求体做处理
  if (m === 'post' || m === 'put' || m === 'delete' || m === 'patch') {
    if (option.query instanceof FormData) {
      // FormData
      option.body = option.query;
    } else {
      option.headers['Content-Type'] =
        option.headers['Content-Type'] || 'application/json';
      option.body = JSON.stringify(option.query); //根据后台要求，如果有时候是java请求会用qs转
    }
  }

  option.signal = signal;
  option.credentials = 'include';

  return new Promise((resolve, reject) => {
    fetch(url, option)
      .then((response) => {
        //处理 浏览器 200 500 状态
        const { status } = response;
        if (status >= 500) {
          message.error('系统错误，请联系管理员');
        }
        return response;
      })
      .then((res) => {
        if (option.headers['Content-Type'] === 'application/octet-stream') {
          return parseBlob(res);
        } else if (option.headers['Content-Type'] === 'application/json') {
          return parseJSON(res);
        }
        return parseJSON(res);
      })
      .then((response) => {
        //处理系统内部错误编码
        // const { code } = response;
        // if (code === 500) {
        //   message.error(response.msg || '系统错误');
        // }
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// //超时处理
// let timeoutPromise = (timeout, controller) => {
//   console.log('timeouttimeout', timeout);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(new Response('timeout', { status: 521, statusText: 'timeout ' }));
//       //超时自动关闭当前请求
//       controller.abort();
//     }, timeout);
//   });
// };

let request = (url, option) => {
  controller = new AbortController();
  let signal = controller.signal;
  return Promise.race([
    timeoutPromise(timeout, controller),
    Fetch(url, option, signal)
  ])
    .then((resp: any) => {
      // console.log("requests",resp);
      //在这里判断请求超时
      if (resp.status === 521) {
        message.error('请求超时');
        return {
          success: false,
          status: 521,
          msg: '请求超时'
        };
      }
      //令牌过期跳转到登陆页面
      if (resp?.code === 9913) {
        // 延时效果，为了能够看到抛出的提示
        setTimeout(() => {
          localStorage.removeItem('Authorization');
          return (window.location.href = `/login?redirectUrl=${window.location.pathname}`);
        }, 1000);
      }
      return resp;
    })
    .catch((error) => {
      return {
        success: false,
        status: 521,
        msg: '系统错误，请联系管理员'
      };
    });
};

export default request;
