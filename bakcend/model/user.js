/**
 * user.js
 * @description :: sequelize model of database table user
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const bcrypt = require('bcrypt');
const authConstantEnum = require('../constants/authConstant');
let User = sequelize.define('user',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  username:{ type:DataTypes.STRING },
  password:{ type:DataTypes.STRING },
  email:{ type:DataTypes.STRING },
  name:{ type:DataTypes.STRING },
     
  userType:{
    type:DataTypes.INTEGER,
    required:true,
    values:convertObjectToEnum(authConstantEnum.USER_TYPES)
  },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  phone_number:{ type:DataTypes.STRING },
  profile_img:{ type:DataTypes.STRING },
  sign_img:{ type:DataTypes.STRING },
  aadhar_img:{ type:DataTypes.STRING },
  pan_img:{ type:DataTypes.STRING },
  bank_img:{ type:DataTypes.STRING },
  pan_no:{ type:DataTypes.STRING },
  aadhar_no:{ type:DataTypes.STRING },
  acc_no:{ type:DataTypes.STRING },
  demat_pdf_url:{ type:DataTypes.STRING },
  address_line_1:{ type:DataTypes.STRING },
  address_line_2:{ type:DataTypes.STRING },
  town:{ type:DataTypes.STRING },
  city:{ type:DataTypes.STRING },
  state:{ type:DataTypes.STRING },
  pincode:{ type:DataTypes.STRING },
  blob:{ type:DataTypes.STRING },
  age:{ type:DataTypes.INTEGER },
  profession:{ type:DataTypes.STRING },
  experience:{ type:DataTypes.STRING },
  income:{ type:DataTypes.STRING },
  dob:{ type:DataTypes.DATE },
  isAuth:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  mobileNo:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (user,options){
        if (user.password){ user.password =
          await bcrypt.hash(user.password, 8);}
        user.isActive = true;
        user.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (user,options){
        if (user !== undefined && user.length) { 
          for (let index = 0; index < user.length; index++) { 
            const element = user[index];
            if (element.password){ 
              element.password = await bcrypt.hash(element.password, 8);
            }
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
    afterCreate: [
      async function (user,options){
        sequelize.model('userAuthSettings').create({ userId:user.id });
      },
    ],
  }
}
);
User.prototype.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
sequelizeTransforms(User);
sequelizePaginate.paginate(User);
module.exports = User;
