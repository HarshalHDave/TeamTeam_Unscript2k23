/**
 * bondsValidation.js
 * @description :: validate each post and put request as per bonds model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of bonds */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  symbol: joi.string().allow(null).allow(''),
  series: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  coupon: joi.string().allow(null).allow(''),
  face_value: joi.number().integer().allow(0),
  coupon_split: joi.number().integer().allow(0),
  lot_size: joi.number().integer().allow(0),
  credit_rating: joi.string().allow(null).allow(''),
  maturity_date: joi.date().options({ convert: true }).allow(null).allow(''),
  isin: joi.string().allow(null).allow(''),
  rating_agency: joi.string().allow(null).allow(''),
  bYield: joi.string().allow(null).allow(''),
  mstrQty: joi.number().integer().allow(0),
  blob: joi.string().allow(null).allow(''),
  userType: joi.any().required()
}).unknown(true);

/** validation keys and properties of bonds for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  symbol: joi.string().allow(null).allow(''),
  series: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  coupon: joi.string().allow(null).allow(''),
  face_value: joi.number().integer().allow(0),
  coupon_split: joi.number().integer().allow(0),
  lot_size: joi.number().integer().allow(0),
  credit_rating: joi.string().allow(null).allow(''),
  maturity_date: joi.date().options({ convert: true }).allow(null).allow(''),
  isin: joi.string().allow(null).allow(''),
  rating_agency: joi.string().allow(null).allow(''),
  bYield: joi.string().allow(null).allow(''),
  mstrQty: joi.number().integer().allow(0),
  blob: joi.string().allow(null).allow(''),
  userType: joi.any().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of bonds for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      symbol: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      series: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      coupon: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      face_value: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      coupon_split: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      lot_size: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      credit_rating: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      maturity_date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isin: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      rating_agency: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      bYield: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mstrQty: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      blob: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      userType: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
