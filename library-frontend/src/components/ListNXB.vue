<template>
 <div 
  class="accordion-item"
  v-for="(element, index) in update_dl"
  :key="element._id"
  @click="updateActiveIndex(index)">

    <h2 class="accordion-header" style="display: flex;">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
        <span><strong>Mã nhà xuất bản: &nbsp;</strong> {{ element._id }}</span>&nbsp;&nbsp;&nbsp;
        <span><strong>Tên nhà xuất bản: &nbsp;</strong> {{ element.tenNXB }}</span>
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body">
        <p>Mã nhà xuất bản: {{ element._id }}</p>
        <p>Tên nhà xuất bản: {{ element.tenNXB }}</p>
        <p>Địa chỉ: {{ element.diachiNXB }}</p>
        <button class="btn btn-warning" style="margin-right: 20px;" @click="getdata(element)" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i class="fas fa-edit"> </i>Chỉnh sửa</button>
        <button class="btn btn-danger" @click="getdelete(element)"> <i class="fas fa-edit"> </i>Xóa</button>
        
      </div>
    </div>
  </div>

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Chỉnh sửa sách</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Chỉ hiển thị khi có dữ liệu sách -->
          <EditNXB
        v-show="nxb && nxb._id"
        :nxb="this.nxb"/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditNXB from './chillcomponents/EditNXB.vue';


  export default {
    props: {
        list: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    data(){
      return{
        nxb:{},
        dl: [...this.list]
      };
    },
    components:{
      EditNXB,
    },

    computed:{
      update_dl(){
          this.dl = [...this.list]
          return this.dl
        }
    },

    emits: ["update:activeIndex", "delete:nxb"],

    methods: {
        updateActiveIndex(index) {
          this.$emit("update:activeIndex", index);
        },

        getdata(element){
          this.nxb = element;
        },

        getdelete(element){
          this.$emit("delete:nxb", element)
          this.dl = this.dl.slice(this.activeIndex ,1)
        }
    }
  }; 
</script>