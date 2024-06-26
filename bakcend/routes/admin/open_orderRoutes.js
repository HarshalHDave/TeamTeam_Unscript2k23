/**
 * open_orderRoutes.js
 * @description :: CRUD API routes for open_order
 */

const express = require('express');
const router = express.Router();
const open_orderController = require('../../controller/admin/open_orderController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/open_order/create').post(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.addOpen_order);
router.route('/admin/open_order/list').post(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.findAllOpen_order);
router.route('/admin/open_order/count').post(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.getOpen_orderCount);
router.route('/admin/open_order/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.getOpen_order);
router.route('/admin/open_order/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.updateOpen_order);    
router.route('/admin/open_order/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.partialUpdateOpen_order);
router.route('/admin/open_order/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.softDeleteOpen_order);
router.route('/admin/open_order/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.softDeleteManyOpen_order);
router.route('/admin/open_order/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.bulkInsertOpen_order);
router.route('/admin/open_order/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.bulkUpdateOpen_order);
router.route('/admin/open_order/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.deleteOpen_order);
router.route('/admin/open_order/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,open_orderController.deleteManyOpen_order);

module.exports = router;
