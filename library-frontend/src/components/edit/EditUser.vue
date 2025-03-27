<template>
  <!-- Button trigger modal -->
  <!-- Modal -->

  <div v-if="user">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabelDG">Chỉnh sửa</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="row g-3">
          <div class="col-md-10">
            <label class="form-label" for="id">Mã đoc giả: </label>
            <input type="text" id="id" class="form-control" placeholder="..." v-model="user._id" disabled />
          </div>
          <div class="col-md-10">
            <label class="form-label" for="name">Tên đọc giả</label>
            <input type="text" id="name" class="form-control" placeholder="..." v-model="user.tenDG" />
          </div>
          <div class="col-md-10">
            <label class="form-label" for="born">Ngày sinh</label>
            <input type="date" id="born" class="form-control" placeholder="..." v-model="user.ngaysinhDG" />
          </div>
          <div class="col-md-10">
            <label class="form-label" for="gioitinh">Giới tính</label>
            <input type="text" id="gioitinh" class="form-control" placeholder="..." v-model="user.gioitinhDG" />
          </div>
          <div class="col-md-4">
            <label class="form-label" for="dienthoai">Điện thoại</label>
            <input type="text" class="form-control" id="dienthoai" placeholder="..." v-model="user.dienthoaiDG" />
          </div>
          <div class="col-md-10">
            <label class="form-label" for="diachi">Địa chỉ</label>
            <input type="text" class="form-control" id="diachi" placeholder="..." v-model="user.diachiDG" />
          </div>
          <div class="col-md-10">
            <label class="form-label" for="">Email đọc giả</label>
            <input type="text" id="email" class="form-control" placeholder="..." v-model="user.emailDG" />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="updatetUser">
          Xong
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import docgiaService from "@/services/docgia.service";

export default {
  props: {
    user: { type: Object, required: true },
  },

  methods: {
    async updatetUser() {
      if (confirm("Hoàn tất!")) {
        try {
          const { matkhauDG, ...userData } = this.user;
          await docgiaService.update(this.user._id, this.user);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
