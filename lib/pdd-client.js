const util = require('./utils')
const request = require('./network')

function PddClient(options) {
  if(!(this instanceof PddClient)) {
    return new PddClient(options)
  }
  options = options || {}

  if (!options.clientId || !options.clientSecret) {
    throw new Error('clientId and clientSecret are necessary!')
  }

  this.clientId = options.clientId
  this.clientSecret = options.clientSecret
  this.endpoint = options.endpoint || 'http://gw-api.pinduoduo.com/api/router'
}

PddClient.prototype.request = function(params) {
  return new Promise((resolve, reject) => {
    const err = util.checkRequired(params, 'type')
    if(err) {
      reject(err)
    }
    const args = {
      client_id: this.clientId,
      timestamp: this.timestamp(),
      data_type: 'JSON',
      version: 'V1',
    }

    for (let key in params) {
      if(typeof params[key] === 'object'){
        args[key] = JSON.stringify(params[key])
      } else{
        args[key] = params[key]
      }
    }

    args.sign = this.sign(args)

    request.post(this.endpoint, args).then(res => resolve(res)).catch(err => reject(err))
  })
}

PddClient.prototype.invoke = function(method, params, responseNameCandidate) {
  params.type = method

  return this.request(params).then(res => {
    if (responseNameCandidate && responseNameCandidate.length > 0) {
      let retResult = undefined
      for (let i = 0; i < responseNameCandidate.length; i++) {
        let name = responseNameCandidate[i]
        retResult = res[name]
        if (retResult != undefined) {
          res = retResult
          break
        }
      }
      return res
    }
  })
}

PddClient.prototype.execute = function(apiname, params) {
  return this.invoke(apiname, params, util.getApiResponseNameCandidate(apiname))
}

PddClient.prototype.sign = function(params) {
  var sorted = Object.keys(params).sort()
  var basestring = this.clientSecret
  for (var i = 0, l = sorted.length; i < l; i++) {
    var k = sorted[i]
    basestring += k + params[k]
  }
  // console.log(params)
  basestring += this.clientSecret
  // console.log('basestring ==>', basestring)
  return util.md5(basestring).toUpperCase()
}

PddClient.prototype.timestamp = function() {
  return parseInt((new Date()).getTime() / 1000)
}

module.exports = PddClient
