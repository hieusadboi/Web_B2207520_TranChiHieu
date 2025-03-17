const DocgiaService = require('../services/docgia.service');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');

//create and save a new contact
exports.create = async (req, res, next) => {
    if (!req.body?.tenDG){
        return next(new ApiError(400, 'Tên đọc giả không thể để trống.'));
    }

    if (!req.body?._id){
        return next(new ApiError(400, 'Id đọc giả Không thể để trống.'));
    }

    if (!req.body?.emailDG) {
        return next(new ApiError(400, 'Email đọc giả không thể để trống.'));
    }

    try {
        const docgiaService = new DocgiaService(MongoDB.client);        
        const document = await docgiaService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next (
            new ApiError(500, "Có lỗi xảy ra trong quá trình tạo đọc giả.")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const {name} = req.query;
        const {taikhoanDG} = req.query;
        if (name) {
            documents = await docgiaService.findByName(name);
        }else if(taikhoanDG){
            documents = await docgiaService.findByTaiKhoan(taikhoanDG);
        } else {
            documents = await docgiaService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, 'Có lỗi trong quá trình tìm kiếm đọc giả.')
        );
    }
    return res.send(documents); 
};

exports.findOne = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        
        const document = await docgiaService.findById(req.params.id);
        
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy đọc giả.'));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500, 
                `Có lỗi xảy ra trong quá trình tìm kiếm đọc giả với id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Dữ liệu cập nhật không thể bỏ trống.'));
    }

    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const document = await docgiaService.update(req.params.id, req.body);
        if (document) {
            return next(new ApiError(404, 'Không tìm thấy đọc giả.'));
        }
        return res.send({message: 'Đọc giả đã được cập nhật.'});	
    }catch (error){
        return next(
            new ApiError(500,`Có lỗi xảy ra trong quá trình cập nhật đọc giả với id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const document = await docgiaService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Không tìm thấy đọc giả.'));
        }
        return res.send({message: 'Đọc giả đã được xóa.'});
    }catch (error){
        return next(
            new ApiError(500, `Có lỗi xảy ra trong quá trình xóa đọc giả với id=${req.params.id}`)
        );
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const docgiaService = new DocgiaService(MongoDB.client);
        const deletedCount = await docgiaService.deleteAll();
        return res.send({
            message: `${deletedCount} đọc giả đã được xóa.`
        });
    } catch (error){
        return next (
            new ApiError(500, 'Có lỗi xảy ra trong quá trình xóa đọc giả.')
        );
    }
}

