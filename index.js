/*!
 * Copyright(c) 2017 Hyungjoo Kwon
 * MIT Licensed
 */

const DeliveryCompany = require('./lib/models/DeliveryCompany')
const DeliveryCompanyType = require('./lib/models/DeliveryCompanyType')

module.exports = (options = {}) => {
  const delibee = require('./lib')(options)
  return {
    company: async () => {
      return DeliveryCompanyType
    },
    tracking: async (companyCode, invoiceNumber) => {
      try {
        const company = new DeliveryCompany(companyCode)
        const lowerCode = company.code.toLowerCase()
        const invoice = await delibee[lowerCode](invoiceNumber)
        return {
          success: true,
          invoice
        }
      } catch (e) {
        return {
          success: false,
          message: e.message
        }
      }
    }
  }
}
