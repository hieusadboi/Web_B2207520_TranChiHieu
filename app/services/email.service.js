// src/services/emailService.js
const nodemailer = require('nodemailer');

// Cấu hình transporter cho Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tranchihieu3600@gmail.com',      // Thay bằng email của bạn
        pass: 'crjfrlyntlqbxllf',

    },
});

// Hàm gửi email
const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'tranchihieu3600@gmail.com', // Địa chỉ email người gửi
            to,                           // Địa chỉ email người nhận
            subject,                      // Tiêu đề email
            text,                         // Nội dung email
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email gửi thành công:', info.response);
    } catch (error) {
        console.error('❌ Lỗi khi gửi email:', error);
        throw new Error('Không thể gửi email.');
    }
};

module.exports = sendEmail;
