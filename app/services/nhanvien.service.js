const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const sendEmail = require('./email.service');

class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection('nhanvien');
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10); // Tạo salt với độ khó 10
        const hashedPassword = await bcrypt.hash(password, salt); // Băm mật khẩu
        return hashedPassword;
    }

    async extractNhanvienData(payload) {

        const plainPassword = Math.random().toString(36).slice(-6); // mật khẩu gốc ngẫu nhiên.

        const nhanvien = {
            _id: payload._id,
            tenNV: payload.tenNV,
            diachiNV: payload.diachiNV,
            chucvuNV: payload.chucvuNV,
            dienthoaiNV: payload.dienthoaiNV,
            emailNV: payload.emailNV,
            taikhoanNV: payload._id,
            matkhauNV: await this.hashPassword(plainPassword),
        };

        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );

        return { nhanvien, plainPassword };
    }

    // async create(payload) {

    //     const { nhanvien, plainPassword } = await this.extractNhanvienData(payload);

    //     const result = await this.Nhanvien.findOneAndUpdate(
    //         { _id: nhanvien._id },
    //         { $set: nhanvien },
    //         { returnDocument: 'after', upsert: true }
    //     );

    //     // Gửi mật khẩu gốc qua email
    //     await sendEmail(
    //         nhanvien.emailNV,
    //         'Thông tin tài khoản nhân viên của bạn',
    //         `Xin chào ${nhanvien.tenNV},\n\nTài khoản nhân viên của bạn đã được tạo thành công.\nTên đăng nhập: ${nhanvien.taikhoanNV}\nMật khẩu: ${plainPassword}\n\nVui lòng đổi mật khẩu sau khi đăng nhập.`
    //     );
    //     return result;
    // }


    async create(payload) {
        const { nhanvien, plainPassword } = await this.extractNhanvienData(payload);

        // Kiểm tra nếu nhân viên đã tồn tại
        const existingNhanvien = await this.Nhanvien.findOne({ _id: nhanvien._id });
        if (existingNhanvien) {
            throw new Error('Tài khoản nhân viên đã tồn tại!');
        }

        // Tạo nhân viên mới
        const result = await this.Nhanvien.insertOne(nhanvien);

        // Gửi mật khẩu qua email
        await sendEmail(
            nhanvien.emailNV,
            'Thông tin tài khoản nhân viên của bạn',
            `Xin chào ${nhanvien.tenNV},\n\nTài khoản của bạn đã được tạo thành công.\nTên đăng nhập: ${nhanvien.taikhoanNV}\nMật khẩu: ${plainPassword}\n\nVui lòng đổi mật khẩu sau khi đăng nhập.`
        );

        return result;
    }


    async find(filter) {
        const cursor = this.Nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenNV: { $regex: new RegExp(new RegExp(name)), $options: 'i' }
        });
    }

    async findByTaiKhoan(name) {
        return await this.find({
            taikhoanNV: name
        });
    }

    async findById(id) {
        // if (!ObjectId.isValid(id)) {
        //     throw new Error('Invalid ObjectId');
        // }

        try {
            const nhanvien = await this.Nhanvien.findOne({
                _id: id,
            });
            if (!nhanvien) {
                console.error('Không tìm thấy tâì liệu nhân viên:', id);
                throw new Error('Không tìm thấy tâì liệu nhân viên với id');
            }
            return nhanvien;
        } catch (error) {
            console.error('Có lỗi xảy ra trong khi tìm kiếm nhân viên:', error);
            throw error;
        }
    }

    async update(id, payload) {
        const filter = { _id: id };
        const update = {
            tenNV: payload.tenNV,
            diachiNV: payload.diachiNV,
            dienthoaiNV: payload.dienthoaiNV,
            emailNV: payload.emailNV,
        };
        const result = await this.Nhanvien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result ? true : false;
    }

    async delete(id) {
        const result = await this.Nhanvien.findOneAndDelete({
            _id: id ? id : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Nhanvien.deleteMany({});
        return result.deletedCount;
    }

    async changePassword(id, oldPassword, newPassword) {
        try {
            if (!id || !oldPassword || !newPassword) {
                throw new Error('Thiếu thông tin id hoặc mật khẩu');
            }

            const nhanvien = await this.findById(id);
            if (!nhanvien) {
                throw new Error('Không tìm thấy nhân viên');
            }

            // Kiểm tra mật khẩu cũ
            const isMatch = await bcrypt.compare(oldPassword, nhanvien.matkhauNV);
            if (!isMatch) {
                throw new Error('Mật khẩu cũ không đúng');
            }

            // Cập nhật mật khẩu mới
            const hashedPassword = await this.hashPassword(newPassword);
            const result = await this.Nhanvien.findOneAndUpdate(
                { _id: id },
                { $set: { matkhauNV: hashedPassword } },
                { returnDocument: 'after' }
            );

            if (!result) {
                throw new Error('Cập nhật mật khẩu thất bại');
            }

            // Gửi email thông báo
            await sendEmail(
                nhanvien.emailNV,
                'Mật khẩu đã được thay đổi',
                `Xin chào nhân viên ${nhanvien.tenNV},\n\nMật khẩu của tài khoản ${nhanvien.taikhoanNV} đã được cập nhật thành công.`
            );

            return result;
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error.message);
            throw error;
        }
    }

    async forgotPassword(id, emailNV) {
        try {
            if (!id || !emailNV) {
                throw new Error('Thiếu thông tin tài khoản hoặc email');
            }

            // Tìm nhân viên theo ID
            const nhanvien = await this.findById(id);
            if (!nhanvien) {
                throw new Error('Không tìm thấy nhân viên');
            }

            // Kiểm tra email có khớp với tài khoản không
            if (nhanvien.emailNV !== emailNV) {
                throw new Error('Email không khớp với tài khoản');
            }

            // Tạo mật khẩu mới ngẫu nhiên
            const newPassword = Math.random().toString(36).slice(-6);
            const hashedPassword = await this.hashPassword(newPassword);

            // Cập nhật mật khẩu vào database
            const result = await this.Nhanvien.findOneAndUpdate(
                { _id: id },
                { $set: { matkhauNV: hashedPassword } },
                { returnDocument: 'after' }
            );

            if (!result) {
                throw new Error('Cập nhật mật khẩu thất bại');
            }

            // Gửi email thông báo mật khẩu mới
            await sendEmail(
                emailNV,
                'Khôi phục mật khẩu tài khoản nhân viên',
                `Xin chào ${nhanvien.tenNV},\n\nMật khẩu của tài khoản ${nhanvien.taikhoanNV}mới của bạn là: ${newPassword}\nVui lòng đăng nhập và đổi mật khẩu ngay lập tức để bảo mật tài khoản.`
            );

            return { success: true, message: 'Mật khẩu mới đã được gửi qua email' };
        } catch (error) {
            console.error('Lỗi khi khôi phục mật khẩu:', error.message);
            throw error;
        }
    }

}

module.exports = NhanvienService;