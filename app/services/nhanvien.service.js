const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');


class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection('nhanvien');
    }
//    dinh ngia cac phuong thuc

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10); // Tạo salt với độ khó 10
        const hashedPassword = await bcrypt.hash(password, salt); // Băm mật khẩu
        return hashedPassword;
    }

    async extractNhanvienData(payload) {
        const mk = await this.hashPassword("1")
         const nhanvien = {
            _id: payload._id,
            tenNV: payload.tenNV,
            diachiNV: payload.diachiNV,
            chucvuNV: payload.chucvuNV,
            dienthoaiNV: payload.dienthoaiNV,
            taikhoanNV: payload._id,
            matkhauNV: mk,
        };
        // remove undefined fields
        Object.keys(nhanvien).forEach(
            (key) => nhanvien[key] === undefined && delete nhanvien[key]
        );
        return nhanvien;
    }

    async create(payload) {
        
        const nhanvien = await this.extractNhanvienData(payload);
        
        const result = await this.Nhanvien.findOneAndUpdate(
            nhanvien,
            { $set: nhanvien },
            { returnDocument: 'after', upsert: true }
            );
        return result;
    }


    async find (filter) {
        const cursor = this.Nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tenNV: {$regex: new RegExp(new RegExp(name)), $options: 'i'}
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
        const filter = {
            _id: id ? id : null,
        };    
        const update = {
            _id: payload._id,
            tenNV: payload.tenNV,
            diachiNV: payload.diachiNV,
            chucvuNV: payload.chucvuNV,
            dienthoaiNV: payload.dienthoaiNV,
            taikhoanNV: payload._id,
            matkhauNV: await this.hashPassword(payload.matkhauNV),
        };
        const result = await this.Nhanvien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: 'after' }
        );
        return result.updatedExisting;
    }

    async delete(id) {
        const result = await this.Nhanvien.findOneAndDelete({
            _id: id ? id : null,
        });
        return result;
    }

    async deleteAll (){
        const result = await this.Nhanvien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanvienService;