const express = require('express')
const router = express.Router();
const {
	getAuthUri,
    authenticateUser
} = require('../controllers/auth');

router.route('/get-intuite-auth-uri').get(getAuthUri)
router.route('/authenticate').post(authenticateUser)


module.exports = router
