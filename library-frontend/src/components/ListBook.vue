<template>
  <div 
    class="accordion-item"
    v-for="(element, index) in list"
    :key="element._id"
    @click="updateActiveIndex(index)"
  >

    <h2 class="accordion-header" style="display: flex;">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
        <span><strong>Mã sách: &nbsp;</strong> {{ element._id }}</span>&nbsp;&nbsp;&nbsp;
        <span><strong>Tên sách: &nbsp;</strong> {{ element.tenSach }}</span>
      </button>
    </h2>
    <div :id="element._id" class="accordion-collapse collapse">
      <div class="accordion-body">
        <p>Mã sách: {{ element._id }}</p>
        <p>Tên sách: {{ element.tenSach }}</p>
        <p>Tác giả: {{ element.tacgia }}</p>
        <p>Năm xuất bản: {{ element.namXB }}</p>
        <p>Mã NXB: {{ element.maNXB }}</p>        
        <p>Số quyển: {{ element.soquyenSach }}</p>

        <!-- Sử dụng data-bs-toggle để hiển thị modal -->
        <button class="btn btn-warning" style="margin-right: 20px;" @click="getdata(element)" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <i class="fas fa-edit"></i> Chỉnh sửa
        </button>
        <button class="btn btn-danger" @click="getdelete(element)">
          <i class="fas fa-trash"></i> Xóa
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Chỉnh sửa sách</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Chỉ hiển thị khi có dữ liệu sách -->
          <EditBook 
          :book="book" 
          v-if="book && book._id" 
          @send:book="sendBook"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EditBook from './chillcomponents/EditBook.vue';
  export default {
    components: {
      EditBook,
    },

    data() {
      return {
        book: {}, // Dữ liệu sách đang được chỉnh sửa
      };
    },

    props: {
      list: { type: Array, default: [] },
      activeIndex: { type: Number, default: -1 },
    },

    emits: ["update:activeIndex", "delete:book", "send:book"],

    methods: {
      // Cập nhật index của item được chọn
      updateActiveIndex(index) {
        this.$emit("update:activeIndex", index);
      },

      // Lấy thông tin của sách khi click chỉnh sửa
      getdata(element) {
        this.book = element;
      },

      // Gọi sự kiện xóa sách
      getdelete(element) {
        this.$emit("delete:book", element);
      },

      sendBook(book){
        this.$emit("send:book", book)
      }
    },
  };
</script>
