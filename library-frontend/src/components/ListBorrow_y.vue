<template>
  <div 
    class="accordion-item"
    v-for="(element, index) in dl"
    :key="element._id"
    @click="updateActiveIndex(index)">

    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+ element._id" aria-expanded="false" :aria-controls="element._id">
        <strong>Mã đọc giả: &nbsp;</strong> {{ element.maDG }}&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Mã sách: &nbsp;</strong> {{ element.maSach }}
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body" style="text-align: left;">
        <p>Mã đọc giả: {{ element.maDG }}</p>
        <p>Mã sách: {{ element.maSach }}</p>
        <p>Ngày mượn: {{ element.ngaymuon }}</p>
        <p v-if="element.ngaytra">Ngày trả: {{ element.ngaytra }}</p>
        <p>Trạng thái: <strong class="text-danger">{{ readTrangthai(element.trangthai) }}</strong></p>        
      </div>
      <div class="p-2">
        <button type="button" class="btn btn-primary m-3" v-if="!element.ngaymuon && nhanvien === 1" @click="accept(element)">Chấp nhận</button>
        <button type="button" class="btn btn-danger" v-if="!element.ngaymuon && nhanvien === 1" @click="reject(element)">Từ chối</button>
        <button type="button" class="btn btn-danger m-3" v-if="element.ngaymuon && nhanvien === 1 && !element.ngaytra" @click="pay(element)">Trả</button>
        <button type="button" class="btn btn-danger m-3" v-if="!element.ngaymuon && nhanvien === 0" @click="cancel(element)">Hủy yêu cầu</button>
      </div>      
    </div>
  </div>
</template>

<script>
import sachService from '@/services/sach.service';
export default {
  props: {
    nhanvien: { type: Number, default: 0 },
    list: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex", 
          "update:theodoi", 
          "update:theodoi_t", 
          "update:list",
          "update:sach_m",
          "update:sach_t",
          "cancel:yeucau",
          "delete:theodoi"],
  data() {
    return {
      dl: [...this.list], // Danh sách dữ liệu hiển thị
    };
  },

  watch: {
    // Cập nhật dl khi list thay đổi
    list: {
      handler(newValue) {
        console.log("Danh sách mới:", newValue);
        this.dl = [...newValue]; // Tạo bản sao, tránh thay đổi trực tiếp
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },

    async accept(element) {
      try{
        let sach = await sachService.get(element.maSach)
        if(sach.soquyenSach !== 0){
          element.trangthai = "m"; // Đang mượn
          element.ngaymuon = new Date().toLocaleDateString();
          this.$emit("update:sach_m", element.maSach)
          this.$emit("update:theodoi", element);
          this.removeFromList(element._id);
        }else{
          alert(`Đã hết sách ${element.maSach}, không thể cho mượn!`)
        }
      }catch (error){
        console.log(error)
      }  
    },

    reject(element) {
      element.trangthai = "f"; // Từ chối
      this.$emit("update:theodoi", element);
      
      this.removeFromList(element._id);
    },

    pay(element) {
      try{
        element.trangthai = "t"; // Đã trả
        element.ngaytra = new Date().toLocaleDateString();
        this.$emit("update:theodoi_t", element);
        this.$emit("update:sach_t", element.maSach)
        this.removeFromList(element._id);
      }catch(error){
        console.log(error)
      }
     
    },

    cancel (element){
      element.trangthai = "huy"
      this.$emit("cancel:yeucau", element)
      this.removeFromList(element._id);
      this.$emit("delete:theodoi", element._id)
    },

    removeFromList(id) {
      // Xóa phần tử khỏi danh sách mà không làm mất dữ liệu
      this.dl = this.dl.filter(item => item._id !== id);
      this.$emit("update:list", this.dl); // Gửi danh sách mới lên component cha
    //   this.$emit("update:list", id); // Gửi danh sách mới lên component cha
    },

    readTrangthai(data) {
      switch (data) {
        case "y": return "chờ duyệt!";
        case "m": return "đang mượn!";
        case "f": return "từ chối!";
        default: return "đã trả!";
      }
    },
  },
};
</script>