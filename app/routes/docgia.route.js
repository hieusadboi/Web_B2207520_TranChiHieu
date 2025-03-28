const express = require('express');
const docgia = require('../controllers/docgia.controller');

const router = express.Router();

router.route('/')
    .get(docgia.findAll)
    .post(docgia.create)
    .delete(docgia.deleteAll);


router.route('/:id')
    .get(docgia.findOne)
    .put(docgia.update)
    .delete(docgia.delete);

router.route('/:id/changePassword')
    .put(docgia.changePassword);

router.route('/forgotPassword')
    .post(docgia.forgotPassword);

module.exports = router;