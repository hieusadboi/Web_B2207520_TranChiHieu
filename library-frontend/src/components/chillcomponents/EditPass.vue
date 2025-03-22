<template>
  <div v-if="nhanvienMK">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Đổi mật khẩu</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        <form class="row g-4">
          <!-- Tài khoản -->
          <div class="col-md-7">
            <label class="form-label" for="name1">Tài khoản</label>
            <input type="text" id="name1" class="form-control" v-model="nhanvienMK.taikhoanNV" disabled />
          </div>

          <!-- Mật khẩu cũ -->
          <div class="col-md-7">
            <label class="form-label" for="mkcu">Nhập mật khẩu cũ</label>
            <input type="password" class="form-control" id="mkcu" placeholder="..." v-model="passOld" required />
          </div>

          <!-- Mật khẩu mới -->
          <div class="col-md-7">
            <label class="form-label" for="mkmoi">Nhập mật khẩu mới</label>
            <input type="password" class="form-control" id="mkmoi" placeholder="..." v-model="passNew1" required />
          </div>

          <!-- Nhập lại mật khẩu mới -->
          <div class="col-md-7">
            <label class="form-label" for="mkmoi2">Nhập lại mật khẩu mới</label>
            <input type="password" class="form-control" id="mkmoi2" placeholder="..." v-model="passNew2" required />
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="checkpass">
          Xong
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="refresh">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import nhanvienService from "@/services/nhanvien.service";

export default {
  data() {
    return {
      passOld: "",
      passNew1: "",
      passNew2: "",
    };
  },
  props: {
    nhanvienMK: { type: Object, required: true },
  },
  methods: {
    async checkpass() {
      if (!this.passOld || !this.passNew1 || !this.passNew2) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      if (this.passNew1 !== this.passNew2) {
        alert("Mật khẩu mới không trùng khớp!");
        return;
      }

      if (confirm("Xác nhận đổi mật khẩu?")) {
        try {
          await nhanvienService.changePassword(this.nhanvienMK._id, this.passOld, this.passNew1);
          alert("Mật khẩu đã được cập nhật thành công!");
          this.refresh();
        } catch (error) {
          console.error("Lỗi cập nhật mật khẩu:", error);
          alert(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật mật khẩu");
        }
      }
    },
    refresh() {
      this.passOld = "";
      this.passNew1 = "";
      this.passNew2 = "";
    },
  },
};
</script>
