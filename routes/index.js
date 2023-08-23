const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.post('/api/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/api/users', userController.signUp)

router.post('/api/admin/signin', passport.authenticate('local', { session: false }), adminController.signIn)
router.use('/api/admin', authenticated, authenticatedAdmin, admin)

router.get('/', (req, res) => res.send('hello world'))

router.use('/', generalErrorHandler)

module.exports = router
