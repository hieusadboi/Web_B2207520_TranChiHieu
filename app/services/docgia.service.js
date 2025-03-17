const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const sendEmail = require('./email.service');

class DocgiaService {
    constructor(client) {
        this.Docgia = client.db().collection('docgia');
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10); // Tạo salt với độ khó 10
        const hashedPassword = await bcrypt.hash(password, salt); // Băm mật khẩu
        return hashedPassword;
    }

    async extractDocgiaData(payload) {
        const plainPassword = Math.random().toString(36).slice(-6); // mật khẩu gốc ngẫu nhiên.

        console.log('Mật khẩu trước khi mã hóa:', plainPassword);

        const docgia = {
            _id: payload._id,
            tenDG: payload.tenDG,
            diachiDG: payload.diachiDG,
            gioitinhDG: payload.gioitinhDG,
            ngaysinhDG: payload.ngaysinhDG,
            emailDG: payload.emailDG, // ✅ Thêm email
            dienthoaiDG: payload.dienthoaiDG,
            taikhoanDG: payload._id,
            matkhauDG: await this.hashPassword(plainPassword), // Mã hóa mật khẩu
        };

        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );

        // Có thể trả về mật khẩu gốc cùng với thông tin đọc giả nếu muốn gửi cho người dùng
        return { docgia, plainPassword };
    }

    async create(payload) {
        const { docgia, plainPassword } = await this.extractDocgiaData(payload);

        // Lưu đọc giả vào cơ sở dữ liệu
        const result = await this.Docgia.findOneAndUpdate(
            { _id: docgia._id },
            { $set: docgia },
            { returnDocument: 'after', upsert: true }
        );

        // Gửi mật khẩu gốc qua email
        await sendEmail(
            docgia.emailDG,
            'Thông tin tài khoản đọc giả của bạn',
            `Xin chào ${docgia.tenDG},\n\nTài khoản của bạn đã được tạo thành công.\nTên đăng nhập: ${docgia.taikhoanDG}\nMật khẩu: ${plainPassword}\n\nVui lòng đổi mật khẩu sau khi đăng nhập.`
        );
        return result;
    }



    async find (filter) {
        const cursor = this.Docgia.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenDG: {$regex: new RegExp(new RegExp(name)), $options: 'i'}
        });
    }

    async findByTaiKhoan(taikhoanDG) {
        return await this.find({
            taikhoanDG: taikhoanDG
        });
    }

    async findById(id) {
        // if (!ObjectId.isValid(id)) {
        //     throw new Error('Invalid ObjectId');
        // }
        
        try {
            const docgia = await this.Docgia.findOne({
                _id: id,
            });
            if (!docgia) {
                console.error('Không tìm thấy tài liệu độc giả:', id);
                throw new Error('Không tìm thấy tài liệu độc giả với id');
            }
            return docgia;
        } catch (error) {
            console.error('Có lỗi xảy ra khi tìm kiếm độc giả:', error);
            throw error;
        }
    }

    async update(id, payload) {
        const filter = {
            _id: id ? id : null,
        };    
        const update = {
            _id: payload._id,
            tenDG: payload.tenDG,
            diachiDG: payload.diachiDG,
            gioitinhDG: payload.gioitinhDG,
            ngaysinhDG: payload.ngaysinhDG,
            dienthoaiDG: payload.dienthoaiDG,
            matkhauDG: await this.hashPassword(payload.matkhauDG),
        };
        const result = await this.Docgia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.updatedExisting;
    }

    async delete(id) {
        const result = await this.Docgia.findOneAndDelete({
            _id: id ? id : null,
        });
        return result;
    }

    async deleteAll (){
        const result = await this.Docgia.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = DocgiaService;