/**
 * open_orderValidation.js
 * @description :: validate each post and put request as per open_order model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of open_order */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  isOpen: joi.boolean(),
  qty: joi.number().integer().allow(0),
  strike_price: joi.string().allow(null).allow(''),
  isSell: joi.boolean(),
  isCancelled: joi.boolean(),
  isin: joi.string().allow(null).allow(''),
  bondId: joi.number().integer().allow(0),
  isCo_own: joi.boolean().default(false),
  blob: joi.string().allow(null).allow(''),
  userType: joi.any().required()
}).unknown(true);

/** validation keys and properties of open_order for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  isOpen: joi.boolean(),
  qty: joi.number().integer().allow(0),
  strike_price: joi.string().allow(null).allow(''),
  isSell: joi.boolean(),
  isCancelled: joi.boolean(),
  isin: joi.string().allow(null).allow(''),
  bondId: joi.number().integer().allow(0),
  isCo_own: joi.boolean().default(false),
  blob: joi.string().allow(null).allow(''),
  userType: joi.any().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of open_order for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isOpen: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      qty: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      strike_price: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isSell: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isCancelled: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isin: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      bondId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isCo_own: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      blob: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      userType: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
