/**
 * bondsController.js
 * @description :: exports action methods for bonds.
 */

const Bonds = require('../../model/bonds');
const bondsSchemaKey = require('../../utils/validation/bondsValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Bonds in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Bonds. {status, message, data}
 */ 
const addBonds = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      bondsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBonds = await dbService.createOne(Bonds,dataToCreate);
    return  res.success({ data :createdBonds });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Bonds in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Bondss. {status, message, data}
 */
const bulkInsertBonds = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBonds = await dbService.createMany(Bonds,dataToCreate); 
      return  res.success({ data :{ count :createdBonds.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Bonds from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Bonds(s). {status, message, data}
 */
const findAllBonds = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBonds;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      bondsSchemaKey.findFilterKeys,
      Bonds.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBonds = await dbService.count(Bonds, query);
      if (!foundBonds) {
        return res.recordNotFound();
      } 
      foundBonds = { totalRecords: foundBonds };
      return res.success({ data :foundBonds });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBonds = await dbService.paginate( Bonds,query,options);
    if (!foundBonds){
      return res.recordNotFound();
    }
    return res.success({ data:foundBonds }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Bonds from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Bonds. {status, message, data}
 */
const getBonds = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBonds = await dbService.findOne(Bonds,{ id :id });
    if (!foundBonds){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBonds });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Bonds.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBondsCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      bondsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBonds = await dbService.count(Bonds,where);
    if (!countedBonds){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBonds } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Bonds with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bonds.
 * @return {Object} : updated Bonds. {status, message, data}
 */
const updateBonds = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bondsSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBonds = await dbService.update(Bonds,query,dataToUpdate);
    return  res.success({ data :updatedBonds }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Bonds with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bondss.
 * @return {Object} : updated Bondss. {status, message, data}
 */
const bulkUpdateBonds = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBonds = await dbService.update(Bonds,filter,dataToUpdate);
    if (!updatedBonds){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBonds.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Bonds with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bonds.
 * @return {Object} : updated Bonds. {status, message, data}
 */
const partialUpdateBonds = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bondsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBonds = await dbService.update(Bonds, query, dataToUpdate);
    if (!updatedBonds) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBonds });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Bonds from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Bonds.
 * @return {Object} : deactivated Bonds. {status, message, data}
 */
const softDeleteBonds = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Bonds, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Bonds from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Bonds. {status, message, data}
 */
const deleteBonds = async (req, res) => {
  const result = await dbService.deleteByPk(Bonds, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Bonds in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBonds = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedBonds = await dbService.destroy(Bonds,query);
    return res.success({ data :{ count :deletedBonds.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Bonds from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Bonds.
 * @return {Object} : number of deactivated documents of Bonds. {status, message, data}
 */
const softDeleteManyBonds = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedBonds = await dbService.update(Bonds,query,updateBody, options);
    if (!updatedBonds) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedBonds.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBonds,
  bulkInsertBonds,
  findAllBonds,
  getBonds,
  getBondsCount,
  updateBonds,
  bulkUpdateBonds,
  partialUpdateBonds,
  softDeleteBonds,
  deleteBonds,
  deleteManyBonds,
  softDeleteManyBonds,
};
