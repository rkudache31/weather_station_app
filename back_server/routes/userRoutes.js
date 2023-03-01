const express = require('express');
const userController = require('./../controllers/userController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.post(
  '/signup',
  authController.signup,
  authController.protect,
  authController.restrictTo('admin')
);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/login', authController.login);
router.get('/logout', authController.logoutUser);
router.get('/user', authController.checkUser);

router
  .route('/')
  .get(
    userController.getAllUsers
    // authController.protect,
    // authController.restrictTo('admin')
  )
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
