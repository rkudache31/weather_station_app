const express = require('express');
const nodeController = require('./../controllers/nodeController');

const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(
    // authController.protect,
    // authController.restrictTo('admin', 'user'),
    nodeController.getAllNodes
  )

  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nodeController.createNode
  );
router.route('/getDataByDate').get(nodeController.getTheNodeRange);
router.route('/tempdelete').get(nodeController.getAllNodesTempDelet);

router
  .route('/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nodeController.createNodeId
  )
  .get(
    authController.protect,
    authController.restrictTo('user'),
    nodeController.getNodeByUsers
  )
  .patch(nodeController.updateNode)

  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nodeController.deleteNodePerm
  );
router
  .route('/tempdelete/:id')
  .put(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nodeController.deleteNodeTemp
  );
router
  .route('/:id/restore')
  .put(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    nodeController.restoreNode
  );
module.exports = router;
