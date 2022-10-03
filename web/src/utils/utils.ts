import { message } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import route from '@/config';
/**
 * @name isIE
 * @description 判断是否是IE
 */
export function isIE() {
  const bw = window.navigator.userAgent;
  const compare = (s) => bw.indexOf(s) >= 0;
  const ie11 = (() => 'ActiveXObject' in window)();
  return compare('MSIE') || ie11;
}
/**
 * @name isLogin
 * @description 判断是否登录
 */
export function isLogin() {
  return localStorage.getItem('Authorization');
}

/**
 * @interface exportParam
 * @description 导出
 */
interface exportParam {
  url: string;
  params?: Object;
  fileName: string;
  timeOut?: Number;
  method?: 'POST' | 'GET';
}

/**
 * @name requestExport
 * @description 发送请求
 * @param url 
 * @param params 
 * @param method 
 * @param signal 
 * @param controller 
 * @returns 
 */
function requestExport(url, params, method, signal, controller) {
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

  return new Promise((resolve) => {
    const routemap = getRouteMap();
    let routeKey = '';
    for (let i in routemap) {
      if (pathToRegexp(routemap[i]).test(window.location.pathname)) {
        routeKey = i;
      }
    }
    let options: any = {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json;application/octet-stream',
        Authorization: `${window.localStorage.getItem('Authorization')}`,
        RouteKey: routeKey
      }),
      signal: signal
    };
    if (method === 'POST') {
      options.body = JSON.stringify(params);
    }
    console.log('options', options);
    fetch(url, { ...options })
      .then((response) => {
        const { ok } = response;
        if (!ok) {
          message.error('网络错误');
          controller.abort();
          throw '网络错误';
        }
        return response;
      })
      .then((res) => res.blob())
      .catch((error) => {
        throw error;
      })
      .then((response) => {
        resolve(response);
      });
  });
}

/**
 * @name timeoutPromise
 * @description 超时处理
 * @param timeout 
 * @param controller 
 * @returns 
 */
export function timeoutPromise(timeout, controller) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Response('timeout', { status: 521, statusText: 'timeout ' }));
      //超时自动关闭当前请求
      controller.abort();
    }, timeout);
  });
}

/**
 * @name download
 * @description 下载导出文件
 * @param blobs 
 * @param fileName 
 */
export function download(blobs, fileName, suffix = null) {
  const defaultName = '未命名的导出文件';
  const blob = new Blob([blobs]);
  const name = `${fileName ? fileName : defaultName}` + (suffix ? `.${suffix}` : '');
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a');
    elink.download = name;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    const msSaveBlob = navigator['msSaveBlob'];
    msSaveBlob && msSaveBlob(blob, fileName);
  }
}

/**
 * @name commonExport
 * @description 公共导出
 * @param param0 
 * @returns 
 */
export function commonExport({
  url,
  params,
  method = 'POST',
  fileName,
  timeOut
}: exportParam) {
  let controller = new AbortController();
  let signal = controller.signal;
  let time = timeOut ? timeOut : 60000;
  return Promise.race([
    requestExport(url, params, method, signal, controller),
    timeoutPromise(time, controller)
  ])
    .then((resp: any) => {
      download(resp, fileName, 'xlsx');
    })
    .catch((err) => {
      throw err + '请求超时';
    });
}

/**
 * @name enCodeStr
 * @description 前端字符串加密
 * @param str 
 * @returns 
 */
export const enCodeStr = (str: string): string => {
  return btoa(str);
};

/**
 * @name enCodeStr
 * @description 前端字符串解密
 * @param str 
 * @returns 
 */
export const deCodeStr = (str: string): string => {
  return atob(str);
};

/**
 * 本地udc生成
 */
interface udcListItem {
  label: string;
  value: any;
  id: string;
}

function listToMap(list) {
  const map = {};
  list.forEach((element: udcListItem) => {
    map[element.value] = element.label;
  });
  return map;
}
class udcGenerator {
  data = null;
  map = {}
  constructor(list: Array<udcListItem>) {
    const _list = list || [];
    this.data = _list;
    this.map = listToMap(_list);
  }
  getLabel = (value) => {
    return this.map[value] || '';
  }
}
//已预置的
const template_export = [
  {
    label: '导出模板',
    value: true,
    id: 'export'
  },
  {
    label: '导入模板',
    value: false,
    id: 'import'
  }
];
const udcLocal = {
  template_export: new udcGenerator(template_export)
}
export {
  udcGenerator,
  udcLocal
}