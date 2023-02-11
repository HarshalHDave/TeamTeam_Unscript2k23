/**
 * bondsRoutes.js
 * @description :: CRUD API routes for bonds
 */

const express = require('express');
const router = express.Router();
const bondsController = require('../../controller/admin/bondsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/bonds/create').post(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.addBonds);
router.route('/admin/bonds/list').post(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.findAllBonds);
router.route('/admin/bonds/count').post(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.getBondsCount);
router.route('/admin/bonds/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.getBonds);
router.route('/admin/bonds/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.updateBonds);    
router.route('/admin/bonds/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.partialUpdateBonds);
router.route('/admin/bonds/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.softDeleteBonds);
router.route('/admin/bonds/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.softDeleteManyBonds);
router.route('/admin/bonds/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.bulkInsertBonds);
router.route('/admin/bonds/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.bulkUpdateBonds);
router.route('/admin/bonds/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.deleteBonds);
router.route('/admin/bonds/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,bondsController.deleteManyBonds);

module.exports = router;
