/**
 * bonds.js
 * @description :: sequelize model of database table bonds
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Bonds = sequelize.define('bonds',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  symbol:{ type:DataTypes.STRING },
  series:{ type:DataTypes.STRING },
  type:{ type:DataTypes.STRING },
  coupon:{ type:DataTypes.STRING },
  face_value:{ type:DataTypes.INTEGER },
  coupon_split:{ type:DataTypes.INTEGER },
  lot_size:{ type:DataTypes.INTEGER },
  credit_rating:{ type:DataTypes.STRING },
  maturity_date:{ type:DataTypes.DATE },
  isin:{ type:DataTypes.STRING },
  rating_agency:{ type:DataTypes.STRING },
  bYield:{ type:DataTypes.STRING },
  mstrQty:{ type:DataTypes.INTEGER },
  blob:{ type:DataTypes.STRING },
  userType:{
    type:DataTypes.INTEGER,
    required:true
  }
}
,{
  hooks:{
    beforeCreate: [
      async function (bonds,options){
        bonds.isActive = true;
        bonds.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (bonds,options){
        if (bonds !== undefined && bonds.length) { 
          for (let index = 0; index < bonds.length; index++) { 
        
            const element = bonds[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Bonds.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Bonds);
sequelizePaginate.paginate(Bonds);
module.exports = Bonds;
