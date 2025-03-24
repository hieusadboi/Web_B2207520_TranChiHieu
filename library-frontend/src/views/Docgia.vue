<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary-subtle fixed-top">
    <!-- Container wrapper -->
    <div class="container">
      <!-- Navbar brand -->
      <img src="https://i.postimg.cc/7PCN37yM/logo.jpg" width="60" style="margin-right: 300px ; border-radius: 50%;">
      <!-- Search form -->
      <SearchBar_user v-model="searchText" />

      <!-- Toggle button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Collapsible wrapper -->
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <!-- Left links -->
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
          <li class="nav-item">
            <a class="nav-link d-flex flex-column text-center active" aria-current="page" href="#"
              @click="nav_pick = 0, updateSach"><i class="fas fa-home fa-lg my-2"></i><span class="small">Trang
                chủ</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex flex-column text-center active" aria-current="page" href="#"
              @click="nav_pick = 1, updateList_y"><i class="fa-solid fa-paper-plane"></i><span class="small">Yêu cầu
                mượn sách</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"
              @click="nav_pick = 2, updateList_m"><i class="fa-solid fa-book"></i><span class="small">Xem số sách đang
                mượn</span></a>
          </li>

          <li class="nav-item">
            <a class="nav-link d-flex flex-column text-center" aria-current="page" href="#"
              @click="nav_pick = 3, updateList_t"><i class="fa-solid fa-clock"></i><span class="small">Lịch sử mượn
                sách</span></a>
          </li>
          <!-- Dropdown -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
              role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://i.postimg.cc/15rsJ8G4/user.png" class="rounded-circle" height="35px" width="35px" alt=""
                loading="lazy" />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal"
                  :data-bs-target="'#profileModal' + user._id">Thông tin đọc giả</a></li>
              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropmk">Đổi mật
                  khẩu</a></li>
              <li><a class="dropdown-item" href="#" @click="logout">Đăng xuất</a></li>
            </ul>
          </li>
        </ul>
        <!-- Left links -->
      </div>
      <!-- Collapsible wrapper -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->

  <div class="modal fade" id="staticBackdropmk" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabelmk" aria-hidden="true">
    <div class="modal-dialog">
      <EditPassUser :nhanvienMK="user" />
    </div>
  </div>

  <ProfileUser :user="user" />
  <main>
    <div style="margin-top: 150px;" class="container px-4 text-center">
      <div class="row gx-5" v-if="nav_pick === 0">
        <Card v-if="filteredTimKiemCount > 0" :sachs="filteredTimkiem" v-model:activeIndex="activeIndex"
          @update:theodoi_y="Addtheodoi" />
      </div>

      <div v-if="nav_pick === 1" class="accordion border p-3 overflow-auto" id="accordionPanelsStayOpenExample"
        style="height: 600px;">
        <div>
          <p v-if="list_y.length === 0">Bạn chưa yêu cầu mượn sách nào!</p>
          <ListBorrow_y :list="list_y" @update:list="update_y" @cancel:yeucau="cancel" @delete:theodoi="deleteTheoDoi"
            v-model:activeIndex="activeIndex" />
        </div>
      </div>

      <div v-if="nav_pick === 2" class="accordion border p-3 overflow-auto" id="accordionPanelsStayOpenExample"
        style="height: 600px;">
        <div>
          <p v-if="list_m.length === 0">Bạn đang không mượn sách nào!</p>
          <ListBorrow v-if="filteredTimKiemCount > 0" :list="filteredTimkiem" v-model:activeIndex="activeIndex" />
        </div>
      </div>

      <div v-if="nav_pick === 3" class="accordion border p-3 overflow-auto" id="accordionPanelsStayOpenExample"
        style="height: 600px;">
        <div>
          <p v-if="list_t.length === 0">Bạn chưa mượn sách nào!</p>
          <ListBorrow v-if="filteredTimKiemCount > 0" :list="filteredTimkiem" v-model:activeIndex="activeIndex" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import Card from "@/components/Card.vue";
import ProfileUser from "@/components/ProfileUser.vue";
import sachService from "@/services/sach.service";
import docgiaService from "@/services/docgia.service";
import EditPassUser from "@/components/chillcomponents/EditPassUser.vue";
import theodoiService from "@/services/theodoi.service";
import ListBorrow from "@/components/ListBorrow.vue";
import WebSocketService from "@/services/websocket.service";
import ListBorrow_y from "@/components/ListBorrow_y.vue";
import SearchBar_user from "@/components/SearchBar_user.vue";
// import ListBorrowUser from "@/components/ListBorrowUser.vue";
export default {
  components: {
    SearchBar_user,
    ListBorrow_y,
    Card,
    ProfileUser,
    EditPassUser,
    ListBorrow,
  },

  data() {
    return {
      sachs: [],
      activeIndex: -1,
      user: {},
      nav_pick: 0,
      list_m: [],
      list_y: [],
      list_t: [],
      element: {},
      message: '',
      messages: [],
      searchText: "",
      wsService: null,
      role: "",
    }
  },

  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },

  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    TimKiemStrings() {
      switch (this.nav_pick) {
        case 0:
          return this.getList_Sach.map((timkiem) => {
            const { _id, maNXB, tacagia, tenSach, namXB, noiDung } = timkiem;
            return [_id, maNXB, tacagia, tenSach, namXB, noiDung].join("");
          });
        case 2:
          return this.list_m.map((timkiem) => {
            const { maSach, maDG, trangthai, ngaytra, ngaymuon } = timkiem;
            return [maSach, maDG, trangthai, ngaytra, ngaymuon].join("");
          });
        case 3:
          return this.list_t.map((timkiem) => {
            const { maSach, maDG, trangthai, ngaytra, ngaymuon } = timkiem;
            return [maSach, maDG, trangthai, ngaytra, ngaymuon].join("");
          });
        default: return [];
      }
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredTimkiem() {
      switch (this.nav_pick) {
        case 0:
          if (!this.searchText) return this.getList_Sach;
          return this.getList_Sach.filter((_timkiem, index) =>
            this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
          );
        case 2:
          if (!this.searchText) return this.list_m;
          return this.list_m.filter((_timkiem, index) =>
            this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
          );
        case 3:
          if (!this.searchText) return this.list_t;
          return this.list_t.filter((_timkiem, index) =>
            this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
          );
        default: return [];
      }
    },

    activeTimKiem() {
      if (this.activeIndex < 0) return null;
      return this.filteredTimkiem[this.activeIndex];
    },

    filteredTimKiemCount() {
      return this.filteredTimkiem ? this.filteredTimkiem.length : 0;
    },

    updateSach() {
      this.laydulieu()
    },

    updateList_y() {
      this.getList_y()
    },

    updateList_m() {
      this.getList_m()
    },

    updateList_t() {
      this.getList_t()
    },

    getList_Sach() {
      try {
        if (!this.messages || this.messages.length === 0) {
          console.warn("Danh sách messages rỗng hoặc undefined:", this.messages);
          return [];
        }

        // Duyệt qua từng tin nhắn và parse JSON nếu cần
        this.messages = this.messages
          .map((msg, index) => {
            try {
              if (!msg) {
                console.warn(`Tin nhắn ở index ${index} bị undefined hoặc null`);
                return null;
              }

              // Nếu tin nhắn có dạng `{ message: 'Welcome to WebSocket server!' }`, bỏ qua
              if (typeof msg === "object" && msg.message === "Welcome to WebSocket server!") {
                console.warn(`Bỏ qua tin nhắn chào WebSocket ở index ${index}`);
                return null;
              }

              // Nếu msg đã là object hợp lệ (_id tồn tại), không cần parse nữa
              if (typeof msg === "object" && msg._id) {
                return msg;
              }

              // Nếu msg là chuỗi JSON, parse nó
              let parsedMsg = typeof msg === "string" ? JSON.parse(msg) : msg;

              // Nếu parsedMsg cũng đã là object hợp lệ (_id tồn tại), trả về luôn
              if (typeof parsedMsg === "object" && parsedMsg._id) {
                return parsedMsg;
              }

              // Nếu parsedMsg có 'message' là "Welcome to WebSocket server!", bỏ qua
              if (parsedMsg?.message === "Welcome to WebSocket server!") {
                console.warn(`Bỏ qua tin nhắn chào WebSocket ở index ${index}`);
                return null;
              }

              // Nếu parsedMsg có 'data', kiểm tra tiếp
              if (parsedMsg.data) {
                let parsedData = typeof parsedMsg.data === "string" ? JSON.parse(parsedMsg.data) : parsedMsg.data;

                // Bỏ qua tin nhắn có type === "ping"
                if (parsedData?.type === "ping") {
                  console.log("Bỏ qua tin nhắn ping:", parsedData);
                  return null;
                }

                return parsedData;
              }

              console.warn(`Tin nhắn không có thuộc tính 'data' ở index ${index}`, parsedMsg);
              return null;
            } catch (error) {
              console.error(`Lỗi khi phân tích JSON ở index ${index}:`, error);
              return null;
            }
          })
          .filter((item) => item !== null) // Loại bỏ giá trị null

        // Gộp với danh sách sách
        this.messages = this.sachs.concat(this.messages);

        // Xóa trùng lặp theo `_id`
        let parsedMessages = Array.from(new Map(this.messages.map(item => [item._id, item])).values());
        return this.removeIfCancelled(parsedMessages);

      } catch (error) {
        console.error("Lỗi trong getList_Sach:", error);
        return [];
      }
    }

  },

  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  methods: {

    removeIfCancelled(arr) {
      // Bước 1: Nhóm phần tử theo id
      const grouped = new Map();

      arr.forEach(item => {
        if (!grouped.has(item._id)) {
          grouped.set(item._id, []);
        }
        grouped.get(item._id).push(item);
      });

      // Bước 2: Lọc bỏ nhóm có trạng thái "hủy"
      const filtered = [...grouped.values()].filter(group =>
        !group.some(item => item.trangthai === "huy")
      );

      // Bước 3: Trả về danh sách hợp lệ (flatten array)
      return filtered.flat();
    },

    update_y(list) {
      this.list_y = list
    },

    async deleteTheoDoi(id) {
      try {
        console.log(id)
        await theodoiService.delete(id)
        this.getList_y()
      } catch (error) {
        console.log(error)
      }
    },

    cancel(element) {
      this.wsService.sendMessage(JSON.stringify(element));
    },

    async laydulieu() {
      try {
        this.sachs = await sachService.getAll();
      } catch (error) {
        console.log(error);
      }

    },

    async getUser() {
      this.user = await docgiaService.get(sessionStorage.getItem("userId"));
      if (!this.user) {
        this.$router.replace({ name: "login" });
      }
      this.role = this.$route.name === "docgia" ? "Độc giả" : "Nhân viên";
    },

    async Addtheodoi(book) {
      try {
        await this.getList_y()
        await this.getList_m()
        let temp1 = this.list_y.some(user => user.maSach === book._id);
        let temp2 = this.list_m.some(user => user.maSach === book._id);
        if (temp1 || temp2) {
          alert("Bạn đang mượn sách này, Hãy trả sách này trước khi mượn lại!")
        }
        else if (confirm(`Bạn có muốn mượn sách ${book._id}?`)) {
          const theodoi = {
            ngaymuon: null,
            maDG: this.user._id,
            maSach: book._id,
            ngaytra: null,
            trangthai: 'y',
          }
          let a = await theodoiService.create(theodoi)
          this.wsService.sendMessage(JSON.stringify(a));
          this.getList_y()
          this.getList_m()
        }
      } catch (error) {
        if (confirm("Bạn chưa đăng nhập, hãy đăng nhập để mượn sách!")) {
          this.logout();
        }
        console.log(error)
      }
    },

    async getList_m() {
      try {
        this.list_m = await theodoiService.get_trangthai('m')
        this.list_m = this.list_m.filter(item => item.maDG === this.user._id)
        console.log(this.list_m)
      } catch (error) {
        console.log(error)
        this.list_m = [];
      }
    },

    async getList_y() {
      try {
        this.list_y = await theodoiService.get_trangthai('y')
        this.list_y = this.list_y.filter(item => item.maDG === this.user._id)
        console.log(this.list_y)
      } catch (error) {
        console.log(error)
        this.list_y = [];
      }
    },

    async getList_t() {
      try {
        this.list_t = await theodoiService.get_trangthai('t')
        this.list_t = this.list_t.filter(item => item.maDG === this.user._id)
        console.log(this.list_t)
      } catch (error) {
        console.log(error)
        this.list_t = [];
      }
    },

    logout() {
      this.$router.push({ name: "loginform" })
    },

    refreshList() {
      this.sachs = [],
        this.activeIndex = -1,
        this.message = "",
        this.user = {},
        this.nav_pick = 0,
        this.element = {}
    },

    // Kết nối WebSocket
    connectWebSocket() {
      this.wsService = new WebSocketService('ws://localhost:3001'); // URL của WebSocket server
      this.wsService.connect(); // Mở kết nối WebSocket

      // Đăng ký callback để nhận tin nhắn từ WebSocket server
      this.wsService.onMessage((message) => {
        this.messages.push(message); // Thêm tin nhắn vào mảng
      });
    },

    // Gửi tin nhắn qua WebSocket
    sendMessage() {
      if (this.message) {
        this.wsService.sendMessage(this.message); // Gửi tin nhắn
        this.message = ''; // Xóa input sau khi gửi
      }
    },
  },
  mounted() {
    this.getUser()
    this.getList_y()
    this.getList_m(),
      this.getList_t(),
      this.laydulieu();
    this.refreshList();
    this.connectWebSocket();
  },

  created() {
    this.wsService = new WebSocketService('ws://localhost:3001/');  // Khởi tạo kết nối
    this.wsService.connect();  // Mở kết nối WebSocket
    this.wsService.onopen = () => {
      console.log('WebSocket connection established');
    };
    // Đăng ký để nhận thông tin từ WebSocket
    this.wsService.onMessage((message) => {

      this.messages.push(message);  // Cập nhật danh sách tin nhắn
    });
  },

  beforeDestroy() {
    if (this.wsService) {
      this.wsService.close(); // Đóng kết nối WebSocket khi component bị huỷ
    }
  },
};
</script>

<style scoped>
@import "@/assets/docgia.css";

.page {
  text-align: left;
  max-width: 750px;
}
</style>
