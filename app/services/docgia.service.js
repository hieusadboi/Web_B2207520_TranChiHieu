const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

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
        const docgia = {
            _id: payload._id,
            tenDG: payload.tenDG,
            diachiDG: payload.diachiDG,
            gioitinhDG: payload.gioitinhDG,
            ngaysinhDG: payload.ngaysinhDG,
            dienthoaiDG: payload.dienthoaiDG,
            taikhoanDG: payload._id,
            matkhauDG: await this.hashPassword('1'),
        };
        // remove undefined fields
        Object.keys(docgia).forEach(
            (key) => docgia[key] === undefined && delete docgia[key]
        );
        return docgia;
    }

    async create(payload) {
        
        const docgia = await this.extractDocgiaData(payload);
        
        const result = await this.Docgia.findOneAndUpdate(
            docgia,
            { $set: docgia },
            { returnDocument: 'after', upsert: true }
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