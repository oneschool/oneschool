/* eslint-disable */
let domain = 'http://127.0.0.1:8080/api/v1'
let axiosInstance = axios.create()
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
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  // let queryUrl = url+(keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
  if (body) {
    return axiosInstance[method](queryUrl, body, config)
  } else if (method === 'get' || method === 'delete' || method === 'head' || method === 'option') {
    return axiosInstance[method](queryUrl, config)
  } else {
    return axiosInstance[method](queryUrl, qs.stringify(form), config)
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
/**
 * Get Classroom Details
 * request: getClassroom
 * url: getClassroomURL
 * method: getClassroom_TYPE
 * raw_url: getClassroom_RAW_URL
 * @param xToken - ID Token by Firebase
 */
export const getClassroom = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/classroom'
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
export const getClassroom_RAW_URL = function() {
  return '/classroom'
}
export const getClassroom_TYPE = function() {
  return 'get'
}
export const getClassroomURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/classroom'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Create classroom
 * request: postClassroom
 * url: postClassroomURL
 * method: postClassroom_TYPE
 * raw_url: postClassroom_RAW_URL
 * @param xToken - ID Token by Firebase
 * @param classroom - 
 */
export const postClassroom = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/classroom'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['xToken'] !== undefined) {
    config.headers['X-Token'] = parameters['xToken']
  }
  if (parameters['xToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xToken'))
  }
  if (parameters['classroom'] !== undefined) {
    body = parameters['classroom']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postClassroom_RAW_URL = function() {
  return '/classroom'
}
export const postClassroom_TYPE = function() {
  return 'post'
}
export const postClassroomURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/classroom'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Get Assignment Details
 * request: getAssignment
 * url: getAssignmentURL
 * method: getAssignment_TYPE
 * raw_url: getAssignment_RAW_URL
 * @param xToken - ID Token by Firebase
 */
export const getAssignment = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/assignment'
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
export const getAssignment_RAW_URL = function() {
  return '/assignment'
}
export const getAssignment_TYPE = function() {
  return 'get'
}
export const getAssignmentURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/assignment'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Create assignment
 * request: postAssignment
 * url: postAssignmentURL
 * method: postAssignment_TYPE
 * raw_url: postAssignment_RAW_URL
 * @param xToken - ID Token by Firebase
 * @param assignment - 
 */
export const postAssignment = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/assignment'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['xToken'] !== undefined) {
    config.headers['X-Token'] = parameters['xToken']
  }
  if (parameters['xToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xToken'))
  }
  if (parameters['assignment'] !== undefined) {
    body = parameters['assignment']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postAssignment_RAW_URL = function() {
  return '/assignment'
}
export const postAssignment_TYPE = function() {
  return 'post'
}
export const postAssignmentURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/assignment'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
/**
 * Create classroom student
 * request: postClassroomAddStudents
 * url: postClassroomAddStudentsURL
 * method: postClassroomAddStudents_TYPE
 * raw_url: postClassroomAddStudents_RAW_URL
 * @param xToken - ID Token by Firebase
 * @param classroomStudent - 
 */
export const postClassroomAddStudents = function(parameters = {}) {
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  const config = parameters.$config || {
    headers: {}
  }
  let path = '/classroom/addStudents'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['xToken'] !== undefined) {
    config.headers['X-Token'] = parameters['xToken']
  }
  if (parameters['xToken'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: xToken'))
  }
  if (parameters['classroomStudent'] !== undefined) {
    body = parameters['classroomStudent']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', domain + path, body, queryParameters, form, config)
}
export const postClassroomAddStudents_RAW_URL = function() {
  return '/classroom/addStudents'
}
export const postClassroomAddStudents_TYPE = function() {
  return 'post'
}
export const postClassroomAddStudentsURL = function(parameters = {}) {
  let queryParameters = {}
  const domain = parameters.$domain ? parameters.$domain : getDomain()
  let path = '/classroom/addStudents'
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  let keys = Object.keys(queryParameters)
  return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '')
}
