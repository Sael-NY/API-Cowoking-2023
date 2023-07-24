const express = require('express')
const router = express.Router()
const userController = require('../controllers/usersController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/signup')
    .post(authController.signUp)

router
    .route('/login')
    .post(authController.login)

router
    .route('/:id')
    .delete(authController.protect, userController.deleteUser)
    .put(authController.protect, userController.updateUser)

module.exports = router