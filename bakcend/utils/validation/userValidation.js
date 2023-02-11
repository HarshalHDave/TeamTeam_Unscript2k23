/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  
 
const authConstantDefault = require('../../constants/authConstant');    

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  phone_number: joi.string().allow(null).allow(''),
  profile_img: joi.string().allow(null).allow(''),
  sign_img: joi.string().allow(null).allow(''),
  aadhar_img: joi.string().allow(null).allow(''),
  pan_img: joi.string().allow(null).allow(''),
  bank_img: joi.string().allow(null).allow(''),
  pan_no: joi.string().allow(null).allow(''),
  aadhar_no: joi.string().allow(null).allow(''),
  acc_no: joi.string().allow(null).allow(''),
  demat_pdf_url: joi.string().allow(null).allow(''),
  address_line_1: joi.string().allow(null).allow(''),
  address_line_2: joi.string().allow(null).allow(''),
  town: joi.string().allow(null).allow(''),
  city: joi.string().allow(null).allow(''),
  state: joi.string().allow(null).allow(''),
  pincode: joi.string().allow(null).allow(''),
  blob: joi.string().allow(null).allow(''),
  age: joi.number().integer().allow(0),
  profession: joi.string().allow(null).allow(''),
  experience: joi.string().allow(null).allow(''),
  income: joi.string().allow(null).allow(''),
  dob: joi.date().options({ convert: true }).allow(null).allow(''),
  isAuth: joi.boolean().default(false),
  mobileNo: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  username: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  phone_number: joi.string().allow(null).allow(''),
  profile_img: joi.string().allow(null).allow(''),
  sign_img: joi.string().allow(null).allow(''),
  aadhar_img: joi.string().allow(null).allow(''),
  pan_img: joi.string().allow(null).allow(''),
  bank_img: joi.string().allow(null).allow(''),
  pan_no: joi.string().allow(null).allow(''),
  aadhar_no: joi.string().allow(null).allow(''),
  acc_no: joi.string().allow(null).allow(''),
  demat_pdf_url: joi.string().allow(null).allow(''),
  address_line_1: joi.string().allow(null).allow(''),
  address_line_2: joi.string().allow(null).allow(''),
  town: joi.string().allow(null).allow(''),
  city: joi.string().allow(null).allow(''),
  state: joi.string().allow(null).allow(''),
  pincode: joi.string().allow(null).allow(''),
  blob: joi.string().allow(null).allow(''),
  age: joi.number().integer().allow(0),
  profession: joi.string().allow(null).allow(''),
  experience: joi.string().allow(null).allow(''),
  income: joi.string().allow(null).allow(''),
  dob: joi.date().options({ convert: true }).allow(null).allow(''),
  isAuth: joi.boolean().default(false),
  mobileNo: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      phone_number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      profile_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sign_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      aadhar_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pan_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      bank_img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pan_no: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      aadhar_no: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      acc_no: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      demat_pdf_url: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address_line_1: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address_line_2: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      town: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      city: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      state: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pincode: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      blob: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      age: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      profession: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      experience: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      income: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      dob: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isAuth: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
