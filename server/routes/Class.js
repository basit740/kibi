const express = require('express')
const router = express.Router();
const {
	getClasses
} = require('../controllers/class');

router.route('/get-classes').get(getClasses)

module.exports = router
