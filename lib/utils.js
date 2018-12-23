const CryptoJS = require('crypto-js')
const MD5 = require('crypto-js/md5')

function md5(s) {
  return MD5(s).toString(CryptoJS.enc.Hex)
}

function YYYYMMDDHHmmss(d, options) {
  d = d || new Date()
  if (!(d instanceof Date)) {
    d = new Date(d)
  }

  var dateSep = '-'
  var timeSep = ':'
  if (options) {
    if (options.dateSep) {
      dateSep = options.dateSep
    }
    if (options.timeSep) {
      timeSep = options.timeSep
    }
  }
  var date = d.getDate()
  if (date < 10) {
    date = '0' + date
  }
  var month = d.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  var hours = d.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }
  var mintues = d.getMinutes()
  if (mintues < 10) {
    mintues = '0' + mintues
  }
  var seconds = d.getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return d.getFullYear() + dateSep + month + dateSep + date + ' ' +
    hours + timeSep + mintues + timeSep + seconds
}

function getApiResponseNameCandidate(apiName){
  const reg = /\./g
  const candidates = []

  if(apiName.match('^pdd.ddk')) {
    apiName = apiName.substr(8)
  }
  let candidate = apiName.replace(reg,'_')+'_response'
  candidates.push(candidate)
  if(candidate.match(/pid/)) {
    candidates.push(candidate.replace(/pid/, 'p_id'))
  }
  if(candidate.match(/increment/)) {
    candidates.push(candidate.replace(/_increment/, ''))
  }
  if(candidate.match(/prom/)) {
    candidates.push(candidate.replace(/_prom_/, 'promotion'))
  }
  if(candidate.match(/goods_search/)) {
    candidates.push(candidate.replace('/goods_search/', 'list_get'))
  }
  if(candidate.match(/url_gen/)) {
    candidates.push(candidate.replace('/url_gen/', 'generate'))
  }
  if(candidate.match(/info/)) {
    candidates.push(candidate.replace('/info/', 'detail'))
  }
  if(candidate.match(/_ge[nt]/)) {
    candidates.push(candidate.replace('/_ge[nt]/', ''))
  }
  if(candidate.match(/mall_goods_list_get/)) {
    candidates.push(candidate.replace('/mall_goods_list_get/', 'goods_info_list'))
  }
  if(candidate.match(/mall_url_gen/)) {
    candidates.push(candidate.replace('/mall_url_gen/', 'mall_coupon_generate_url'))
  }
  if(candidate.match(/list_get/)) {
    candidates.push(candidate.replace('/list_get/', 'show_bill'))
  }
  if(candidate.match(/color_order_increment_get/)) {
    candidates.push(candidate.replace(/color_order_increment_get/, 'order_list_get'))
  }

  return candidates
}

function checkRequired(params, keys) {
  if (!Array.isArray(keys)) {
    keys = [keys]
  }
  for (var i = 0, l = keys.length; i < l; i++) {
    var k = keys[i]
    if (!params.hasOwnProperty(k)) {
      var err = new Error('`' + k + '` required')
      err.name = 'ParameterMissingError'
      return err
    }
  }
}

module.exports = {
  md5,
  YYYYMMDDHHmmss,
  getApiResponseNameCandidate,
  checkRequired,
}
