<!-- filepath: c:\Users\Hiếu\OneDrive\Máy tính\Khoa Học Máy Tính K48\Phát Triển Ứng Dụng Web\HieuB2207520\Đồ Án\backend\library-frontend\src\components\Card.vue -->
<template>
  <div class="card-container">
    <div class="card" v-for="(book, index) in updatedSachs" :key="book._id || index"
      :class="{ active: index === activeIndex }">
      <img :src="book.hinhAnh || 'https://i.postimg.cc/QdtXnXxD/B-a-S-ch.jpg'" class="card-img-top" alt="Hình ảnh sách"
        @click="openModal(book.hinhAnh)" />
      <div class="card-body">
        <h5 class="card-title">{{ book.tenSach }}</h5>
        <p class="card-text" style="text-align: justify">
          <strong>Mã sách: </strong> {{ book._id }} <br />
          <strong>Tác giả: </strong> {{ book.tacgia }} <br />
          <strong>Nhà xuất bản: </strong> {{ book.tenNXB || "Đang tải..." }}
          <br />
          <strong>Năm xuất bản: </strong> {{ book.namXB }} <br />
          <strong>Số quyển sách còn lại: </strong> {{ book.soquyenSach }} <br />
          <span class="xem-them" @click="openContentModal(book.noiDung)">Xem thêm</span>
        </p>
        <a href="#" class="btn btn-primary" @click="muonSach(book)">Đăng kí mượn sách</a>
      </div>
    </div>

    <!-- Modal Hình ảnh -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <img :src="modalImage" alt="Hình ảnh sách lớn" />
      </div>
    </div>

    <!-- Modal Nội dung -->
    <div v-if="showContentModal" class="modal-overlay" @click="closeContentModal">
      <div class="modal-content" @click.stop>
        <p>{{ modalContent }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import nxbService from "@/services/nxb.service";

export default {
  data() {
    return {
      nxbService: nxbService,
      updatedSachs: [], // Dữ liệu đã qua xử lý
      newMessage: "",
      messages: [],
      wsService: null,
      showModal: false,
      modalImage: "",
      showContentModal: false,
      modalContent: "",
    };
  },

  emits: ["update:theodoi_y"],

  props: {
    sachs: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },

  watch: {
    sachs: {
      immediate: true, // Chạy ngay khi component mounted
      handler: async function (newSachs) {
        console.log("New data received:", newSachs);

        // Dùng Promise.all để đảm bảo các dữ liệu bất đồng bộ được xử lý xong trước khi cập nhật
        const filteredBooks = await Promise.all(
          newSachs.map(async (book) => {
            if (book.hasOwnProperty("maDG") && book.hasOwnProperty("maSach")) {
              // Nếu là đối tượng không hợp lệ, trả về null
              return null;
            }

            // Lấy tên NXB từ API (nếu cần)
            let tenNXB = "Không xác định";
            if (book.maNXB) {
              try {
                tenNXB = await this.getNameNXB(book.maNXB); // Gọi API để lấy tên NXB
              } catch (error) {
                console.error("Lỗi khi lấy NXB:", error);
              }
            }

            // Trả về sách đã cập nhật
            return { ...book, tenNXB };
          })
        );

        // Lọc bỏ các đối tượng không hợp lệ (null)
        this.updatedSachs = filteredBooks.filter((book) => book !== null);
        console.log("Filtered and updatedSachs:", this.updatedSachs);
      },
    },
  },

  methods: {
    async getNameNXB(id) {
      try {
        const response = await this.nxbService.get(id);
        return response.tenNXB || "Không xác định";
      } catch (error) {
        console.error("Lỗi khi lấy NXB:", error);
        return "Lỗi";
      }
    },

    muonSach(book) {
      this.$emit("update:theodoi_y", book);
    },

    openModal(imageUrl) {
      this.modalImage = imageUrl;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.modalImage = "";
    },

    openContentModal(content) {
      this.modalContent = content;
      this.showContentModal = true;
    },

    closeContentModal() {
      this.showContentModal = false;
      this.modalContent = "";
    },
  },
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 15px;
  padding: 15px;
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.card-img-top {
  max-width: 100%;
  max-height: 50%;
  width: auto;
  height: auto;
  object-fit: scale-down;
  cursor: pointer;
}

.card-body {
  padding: 10px;
  max-height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 15px;
}

.xem-them {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  display: block;
  margin-top: 5px;
}

.xem-them:hover {
  color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: background-color 0.2s, border-color 0.2s;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  transition: background-color 0.2s, border-color 0.2s;
  margin-top: 10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 15px;
  border-radius: 10px;
  max-width: 500px;
  max-height: 600px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-content img {
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
}
</style>