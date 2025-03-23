const express = require('express');
const nhanvien = require('../controllers/nhanvien.controller');

const router = express.Router();

router.route('/')
    .get(nhanvien.findAll)
    .post(nhanvien.create)
    .delete(nhanvien.deleteAll);

router.route('/:id')
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete);

router.route('/:id/changePassword')
    .put(nhanvien.changePassword);

router.route('/forgotPassword')
    .post(nhanvien.forgotPassword);

module.exports = router;