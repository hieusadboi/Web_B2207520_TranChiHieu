<template>
    <!-- Modal -->
    <div v-if="nhanvien">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabelNV">Chỉnh sửa nhân viên</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <form class="row g-3">
                    <div class="col-md-10">
                        <label class="form-label" for="id">ID: </label>
                        <input type="text" id="id" class="form-control" v-model="localNhanvien._id" disabled />
                    </div>

                    <div class="col-md-10">
                        <label class="form-label" for="name">Tên nhân viên</label>
                        <input type="text" id="name" class="form-control" placeholder="..."
                            v-model="localNhanvien.tenNV" />
                    </div>

                    <div class="col-md-10">
                        <label class="form-label" for="diachi">Địa chỉ</label>
                        <input type="text" id="diachi" class="form-control" placeholder="..."
                            v-model="localNhanvien.diachiNV" />
                    </div>

                    <div class="col-md-4">
                        <label class="form-label" for="dienthoai">Điện thoại</label>
                        <input type="text" id="dienthoai" class="form-control" placeholder="..."
                            v-model="localNhanvien.dienthoaiNV" />
                    </div>

                    <div class="col-md-10">
                        <label class="form-label" for="email">Email</label>
                        <input type="text" id="email" class="form-control" placeholder="..."
                            v-model="localNhanvien.emailNV" />
                    </div>
                    <!-- 
                    <div class="col-md-6">
                        <label class="form-label" for="chucvu">Chức vụ</label>
                        <select id="chucvu" class="form-control" v-model="localNhanvien.chucvuNV">
                            <option value="quản lý">Quản lý</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div> -->
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="updateNhanVien">Xong</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
import nhanvienService from "@/services/nhanvien.service";

export default {
    props: {
        nhanvien: { type: Object, required: true },
    },

    data() {
        return {
            localNhanvien: { ...this.nhanvien },
        };
    },

    watch: {
        nhanvien: {
            handler(newVal) {
                this.localNhanvien = { ...newVal };
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        async updateNhanVien() {
            if (confirm("Bạn có chắc muốn cập nhật thông tin nhân viên?")) {
                try {
                    const { matkhauNV, ...nhanvienData } = this.localNhanvien; // loại trường mk ra 

                    await nhanvienService.update(this.localNhanvien._id, nhanvienData);
                    alert("Cập nhật thông tin nhân viên thành công!");
                    console.log("Cập nhật thông tin nhân viên thành công!");
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
};
</script>