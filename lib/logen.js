const axios = require('axios')
const buffer = require('./utils/buffer')
const parser = require('./parser')

module.exports = (options = {}) => {
  const TIMEOUT = options.timeout || 10000

  return function (invoiceNumber = '') {
    return new Promise(async (resolve, reject) => {
      try {
        const content = await axios.get('https://www.ilogen.com/iLOGEN.Web.New/TRACE/TraceDetail.aspx', {
          timeout: TIMEOUT,
          responseType: 'arraybuffer',
          params: {
            slipno: invoiceNumber,
            gubun: 'fromview'
          }
        })
        const utf8Content = buffer.decode(content.data)
        const invoice = parser.logen(invoiceNumber, utf8Content)
        resolve(invoice)
      } catch (e) {
        reject(e)
      }
    })
  }
}
