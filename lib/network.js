const axios = require('axios')
const qs = require('qs')
const methods = ['post', 'get', 'put', 'delete']
const ins = {}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
axios.defaults.headers.post.Accept = 'application/json'


methods.forEach((method) => {
  ins[method] = (url, data, options = {}) => {
    data = data || {}

    if (method === 'get') {
      data = { params: data }
    } else {
      data = { data: qs.stringify(data) }
    }

    const promise = new Promise((resolve, reject) => axios({
      url,
      method,
      ...data,
      ...options
    }).then(response => resolve(response.data)).catch((error) => {
      reject(error)
    }))

    return promise
  }
})

module.exports = ins
