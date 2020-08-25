/* eslint-disable */
let domain = '/api/v1'
let axiosInstance = axios.create()

const stringify = function queryStringify (obj, prefix) {
  var pairs = []
  for (var key in obj) {
    if (!has.call(obj, key)) {
      continue
    }

    var value = obj[key]
    var enkey = encodeURIComponent(key)
    var pair
    if (typeof value === 'object') {
      pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey)
    } else {
      pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value)
    }
    pairs.push(pair)
  }
  return pairs.join('&')
}

export const getDomain = () => {
  return domain
}
export const setDomain = ($domain) => {
  domain = $domain
}
export const getAxiosInstance = () => {
  return axiosInstance
}
export const setAxiosInstance = ($axiosInstance) => {
  axiosInstance = $axiosInstance
}
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axiosInstance[method](queryUrl, body, config)
  } else if (method === 'get' || method === 'delete' || method === 'head' || method === 'option') {
    return axiosInstance[method](queryUrl, config)
  } else {
    return axiosInstance[method](queryUrl, stringify(form), config)
  }
}
/*==========================================================
 *                    OneSchool Web Servlet API
 ==========================================================*/
/**
 * Get Account Details
 * request: getAccount
 * url: getAccountURL
 * method: getAccount_TYPE
 * raw_url: getAccount_RAW_URL
 * @param xToken - ID Token by Firebase
 */
export const getAccount = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/account'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['xToken'] !== undefined) {
    config.headers['X-Token'] = parameters['xToken']
  }
  if (parameters['xToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xToken'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', domain + path, body, queryParameters, form, config)
}
export const getAccount_RAW_URL = function() {
  return '/account'
}
export const getAccount_TYPE = function() {
  return 'get'
}
export const getAccountURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/account'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Create account
 * request: postAccount
 * url: postAccountURL
 * method: postAccount_TYPE
 * raw_url: postAccount_RAW_URL
 * @param xToken - ID Token by Firebase
 * @param account - 
 */
export const postAccount = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/account'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['xToken'] !== undefined) {
    config.headers['X-Token'] = parameters['xToken']
  }
  if (parameters['xToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xToken'))
  }
  if (parameters['account'] !== undefined) {
    body = parameters['account']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postAccount_RAW_URL = function() {
  return '/account'
}
export const postAccount_TYPE = function() {
  return 'post'
}
export const postAccountURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/account'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Update Account
 * request: putAccount
 * url: putAccountURL
 * method: putAccount_TYPE
 * raw_url: putAccount_RAW_URL
 * @param xToken - ID Token by Firebase
 * @param account - 
 */
export const putAccount = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/account'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['xToken'] !== undefined) {
    config.headers['X-Token'] = parameters['xToken']
  }
  if (parameters['xToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xToken'))
  }
  if (parameters['account'] !== undefined) {
    body = parameters['account']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', domain + path, body, queryParameters, form, config)
}
export const putAccount_RAW_URL = function() {
  return '/account'
}
export const putAccount_TYPE = function() {
  return 'put'
}
export const putAccountURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/account'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}