const express = require('express');
const cors = require('cors');

const docgiaRouter = require('./app/routes/docgia.route');
const nhanvienRouter = require('./app/routes/nhanvien.route');
const nxbRouter = require('./app/routes/nxb.route');
const sachRouter = require('./app/routes/sach.route');
const theodoiRouter = require('./app/routes/theodoi.route');

const ApiError = require('./app/api-error');

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Chào mừng đến với thư viện sách.' });
});

app.use("/api/docgia", docgiaRouter);
app.use("/api/nhanvien", nhanvienRouter);
app.use("/api/nxb", nxbRouter);
app.use("/api/sach", sachRouter);
app.use("/api/theodoi", theodoiRouter);


//handle 404 response
app.use((req, res, next) => {
    //code se chay khi khong co route duoc dinh nghia nao
    //khop yeu cau goi next() de chuyen sang middleware xu ly loi
    return next(new ApiError(404, 'Không tìm thấy tài nguyên.'));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    //Middleware xu ly loi tap trung 
    // Trong doan code xu ly o cac route, goi next(err) se chuyen ve middleware xu ly loi nay
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Lỗi máy chủ nội bộ.',
    });
});

module.exports = app;