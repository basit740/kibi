const express = require('express');
const router = express.Router();

const {getTransactions} = require('../controllers/transections');

router.get('/', getTransactions);

module.exports = router;