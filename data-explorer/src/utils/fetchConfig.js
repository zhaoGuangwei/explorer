import querystring from 'querystring';
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const _defaultOptions = { useApplicationJson: true };
export function setDefaultOptions(options = {}) {
  return Object.assign(_defaultOptions, options);
}

export function fetchData(url, callback, params, cfgs) {
  const configs = Object.assign({
    method: 'get',
    credentials: 'include',
    mode: 'cors',
    cache: 'reload'
  }, _defaultOptions, cfgs);

  configs.method = configs.method.toLowerCase();
  if (params) {
    if (configs.method === 'get') {
      if (url.indexOf('?') > -1) {
        url += querystring.encode(params);
      }
      else {
        url += '?' + querystring.encode(params);
      }
    } else if (configs.method === 'post' || configs.method === 'put' || configs.method === 'delete') {
      if (configs.useApplicationJson) {
        if (!configs.headers) {
          configs.headers = {};
        }
        if (!configs.headers.Accept) {
          configs.headers.Accept = 'application/json';
        }
        if (!configs.headers['Content-Type']) {
          configs.headers['Content-Type'] = 'application/json';
        }
        if (configs.headers.Accept === 'application/json') {
          configs.body = JSON.stringify(params);
        }
        else {
          configs.body = params;
        }
      } else if (configs.useApplicationForm) {
        if (!configs.headers['Content-Type']) {
          configs.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        configs.body = querystring.encode(params);
      } else {
        configs.body = params;
      }
    }
  }

  return fetch(url, configs)
    .then(handleErrors)
    .then(function (response) {
      return response.json();
    }).then(callback);
}