const express = require('express');
const router = express.Router();
const sendEmail = require('../services/emailService');

router.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        const response = await sendEmail(to, subject, text);
        res.json({ success: true, message: 'Email gửi thành công!', response });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi gửi email', error: error.message });
    }
});

module.exports = router;
