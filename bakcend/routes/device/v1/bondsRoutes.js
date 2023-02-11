/**
 * bondsRoutes.js
 * @description :: CRUD API routes for bonds
 */

const express = require('express');
const router = express.Router();
const bondsController = require('../../../controller/device/v1/bondsController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/bonds/create').post(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.addBonds);
router.route('/device/api/v1/bonds/list').post(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.findAllBonds);
router.route('/device/api/v1/bonds/count').post(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.getBondsCount);
router.route('/device/api/v1/bonds/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.getBonds);
router.route('/device/api/v1/bonds/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.updateBonds);    
router.route('/device/api/v1/bonds/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.partialUpdateBonds);
router.route('/device/api/v1/bonds/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.softDeleteBonds);
router.route('/device/api/v1/bonds/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.softDeleteManyBonds);
router.route('/device/api/v1/bonds/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.bulkInsertBonds);
router.route('/device/api/v1/bonds/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.bulkUpdateBonds);
router.route('/device/api/v1/bonds/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.deleteBonds);
router.route('/device/api/v1/bonds/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,bondsController.deleteManyBonds);

module.exports = router;
