<template>
    <div style="padding: 10px 50px; display: flex;" class="bg-secondary text-white p-3 navbar">
        <img src="https://i.postimg.cc/7PCN37yM/logo.jpg" width="80px" style="border-radius: 50px;">
        <div class="page-header pt-3 " style="padding-left: 50px;">
            <h3>Hệ thống quản lý thư viện</h3>
        </div>
        <div class=" ms-auto mb-2 mb-lg-0">
            <ul>
                <li class="dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"
                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://i.postimg.cc/15rsJ8G4/user.png" class="rounded-circle" height="40" alt=""
                            loading="lazy" />
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item btn btn-primary" data-bs-toggle="modal"
                                :data-bs-target="'#profileModal' + this.user._id">Thông tin nhân viên</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="modal"
                                data-bs-target="#staticBackdropmk">Đổi mật khẩu</a></li>
                        <li><a class="dropdown-item" href="#" @click="logout">Đăng xuất</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <hr>
    <div class="modal fade" id="staticBackdropmk" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabelmk" aria-hidden="true">
        <div class="modal-dialog">
            <EditPass :nhanvienMK="user" />
        </div>
    </div>
    <Profile :user="user" />
    <div class="container-fluid bg-light-subtle">
        <div class="row flex-nowrap">
            <div class="col-3 px-2 bg-dark-subtle ">
                <div id="sidebar" class="collapse collapse-horizontal show border-end bg-secondary-subtle">
                    <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100 ">
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 7"><span>Xem tất cả các sách</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 8"><span>Xem tất cả nhà xuất bản</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 6"><span>Xem thông tin độc giả</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 11" v-if="user.chucvuNV === 'admin'"><span>Xem thông tin nhân viên</span>
                        </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 5, updateList_m"><span>Xem thông tin mượn sách</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 9, updateList_t"><span>Xem tất cả các sách đã trả</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 4, update_y"><span>Xử lý yêu cầu mượn sách</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 1"><span>Thêm sách</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 3"><span>Thêm nhà xuất bản</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 2"><span>Thêm độc giả</span> </a>
                        <a href="#"
                            class="list-group-item border-end-0 rounded-3 mt-2 d-inline-block text-truncate bg-white"
                            @click="pick_nav = 10" v-if="user.chucvuNV === 'admin'"><span>Thêm nhân viên</span> </a>
                    </div>
                </div>
            </div>
            <main class="col ps-md-2 pt-2">
                <div class="row">
                    <div class="col-12">
                        <div v-if="pick_nav === 11">
                            <SearchBar name_tag="Xem thông tin nhân viên" v-model="searchText" />
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <ListStaff v-if="filteredTimKiemCount > 0" :list="filteredTimkiem"
                                        v-model:activeIndex="activeIndex" @delete:staff="deleteStaff" />
                                </div>
                            </div>
                        </div>

                        <div v-if="pick_nav === 10">
                            <h4><strong>Nhân viên</strong></h4>
                            <hr>
                            <AddStaff @submit:staff="createStaff" />
                        </div>

                        <div v-if="pick_nav === 1">
                            <h4><strong>Thêm sách</strong></h4>
                            <hr>
                            <AddBook @submit:book="createBook" />
                        </div>



                        <div v-if="pick_nav === 2">
                            <div>
                                <h4> <strong>Thêm đọc giả</strong> </h4>
                                <hr>
                                <AddUser @submit:user="createUser" />
                            </div>
                        </div>

                        <div v-if="pick_nav === 3">
                            <div>
                                <h4> <strong>Thêm nhà xuất bản</strong> </h4>
                                <hr>
                                <AddNXB @submit:nxb="createNXB" />
                            </div>
                        </div>

                        <div v-if="pick_nav === 4">
                            <h4> <strong>Xử lý yêu cầu mượn sách</strong> </h4>
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <p v-if="messages.length === 0"> Không có yêu cầu nào!</p>
                                    <ListBorrow_y :nhanvien=1 :list="getList_y" v-model:activeIndex="activeIndex"
                                        @update:theodoi="updateTTtheodoi" @update:sach_m="update_slSach_m"
                                        @update:list="updateList_y" />
                                </div>
                            </div>
                        </div>

                        <div v-if="pick_nav === 5">
                            <SearchBar name_tag="Xem thông tin mượn sách" v-model="searchText" />
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <p v-if="list_m.length === 0"> Không có sách nào đang cho mượn!</p>
                                    <ListBorrow v-if="filteredTimKiemCount > 0" :nhanvien=1
                                        v-model:list="filteredTimkiem" v-model:activeIndex="activeIndex"
                                        @update:sach_t="update_slSach_t" @update:theodoi_t="updateTTtheodoi_t"
                                        @update:list="update_message" />
                                </div>
                            </div>
                        </div>

                        <div v-if="pick_nav === 6">
                            <SearchBar name_tag="Xem thông tin đọc giả" v-model="searchText" />
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <ListUser v-if="filteredTimKiemCount > 0" :list="filteredTimkiem"
                                        v-model:activeIndex="activeIndex" @delete:user="deleteUser" />
                                </div>
                            </div>
                        </div>

                        <div v-if="pick_nav === 7">
                            <SearchBar name_tag="Xem tất cả sách" v-model="searchText" />
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <ListBook v-if="filteredTimKiemCount > 0" :list="filteredTimkiem"
                                        v-model:activeIndex="activeIndex" @delete:book="deleteBook"
                                        @send:book="update_Sach" />
                                </div>
                            </div>
                        </div>

                        <div v-if="pick_nav === 8">
                            <SearchBar name_tag="Xem tất cả nhà xuất bản" v-model="searchText" />
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <ListNXB v-if="filteredTimKiemCount > 0" :list="filteredTimkiem"
                                        v-model:activeIndex="activeIndex" @delete:nxb="deleteNXB" />
                                </div>
                            </div>
                        </div>

                        <div v-if="pick_nav === 9">
                            <SearchBar name_tag="Xem tất cả các sách đã trả" v-model="searchText" />
                            <hr>
                            <div class="border p-3 overflow-auto" style="height: 600px;">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <ListBorrow v-if="filteredTimKiemCount > 0" :nhanvien=1 :list="filteredTimkiem"
                                        v-model:activeIndex="activeIndex" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>

import EditPass from "@/components/edit/EditPass.vue";

import ListNXB from "@/components/list/ListNXB.vue";
import ListBook from "@/components/list/ListBook.vue";
import ListBorrow from "@/components/list/ListBorrow.vue";
import ListUser from "@/components/list/ListUser.vue";
import ListBorrow_y from "@/components/list/ListBorrow_y.vue";
import ListStaff from "@/components/list/ListStaff.vue";

import AddStaff from "@/components/add/AddStaff.vue";
import AddUser from "@/components/add/AddUser.vue";
import AddBook from "@/components/add/AddBook.vue";
import AddNXB from "@/components/add/AddNXB.vue";

import Profile from "@/components/common/Profile.vue";
import SearchBar from "@/components/common/SearchBar.vue";

import NXBService from "@/services/nxb.service"
import DocgiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service"
import TheodoiService from "@/services/theodoi.service"
import nhanvienService from "@/services/nhanvien.service"
import WebSocketService from "@/services/websocket.service"
// import { json } from "express/lib/response"
export default {
    components: {
        ListStaff,
        AddStaff,
        ListBorrow_y,
        SearchBar,
        EditPass,
        ListNXB,
        ListBook,
        ListBorrow,
        ListUser,
        AddNXB,
        AddUser,
        AddBook,
        Profile,
    },
    emits: ["submit:user"],

    data() {
        return {
            list_staff: [],
            user: {},
            list_nxb: [],
            list_book: [],
            list_user: [],
            list_y: [],
            list_m: [],
            list_t: [],
            pick_nav: 0,
            server: null,
            activeIndex: -1,
            count: 0,
            newMessage: '',
            messages: [],
            wsService: null,
            searchText: "",
            searchStrings: [],
            role: "",
        };
    },

    watch: {
        searchText() {
            this.activeIndex = -1;
        },

        messages() {

        },

        getList_y: {
            handler(newList) {
                this.list_y = newList;
            },
            deep: true, // Theo dõi mảng con
            immediate: true // Cập nhật ngay khi component load
        }
    },


    computed: {

        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        TimKiemStrings() {
            switch (this.pick_nav) {
                case 5:
                    return this.list_m.map((timkiem) => {
                        const { maSach, maDG, trangthai, ngaytra, ngaymuon } = timkiem;
                        return [maSach, maDG, trangthai, ngaytra, ngaymuon].join("");
                    });
                case 6:
                    return this.list_user.map((timkiem) => {
                        const { _id, dienthoaiDG, diachiDG, tenDG, ngaysinhDG, gioitinhDG } = timkiem;
                        return [_id, dienthoaiDG, diachiDG, tenDG, ngaysinhDG, gioitinhDG].join("");
                    });
                case 7:
                    return this.list_book.map((timkiem) => {
                        const { _id, maNXB, soquyenSach, tacgia, tenSach, namNXB, noiDung } = timkiem;
                        return [_id, maNXB, soquyenSach, tacgia, tenSach, namNXB, noiDung].join("");
                    });
                case 8:
                    return this.list_nxb.map((timkiem) => {
                        const { _id, tenNXB, diachiNXB } = timkiem;
                        return [_id, tenNXB, diachiNXB].join("");
                    });
                case 9:
                    return this.list_t.map((timkiem) => {
                        const { maSach, maDG, trangthai, ngaytra, ngaymuon } = timkiem;
                        return [maSach, maDG, trangthai, ngaytra, ngaymuon].join("");
                    });
                case 11:
                    return this.list_staff.map((timkiem) => {
                        const { _id, chucvuNV, dienthoaiNV, diachiNV, tenNV } = timkiem;
                        return [_id, chucvuNV, dienthoaiNV, diachiNV, tenNV].join("");
                    });
                default: return [];
            }
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredTimkiem() {
            switch (this.pick_nav) {
                case 5:
                    if (!this.searchText) return this.list_m;
                    return this.list_m.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
                    );
                case 6:
                    if (!this.searchText) return this.list_user;
                    return this.list_user.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
                    );

                case 7:
                    if (!this.searchText) return this.list_book;
                    return this.list_book.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
                    );

                case 8:
                    if (!this.searchText) return this.list_nxb;
                    return this.list_nxb.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
                    );
                case 9:
                    if (!this.searchText) return this.list_t;
                    return this.list_t.filter((_timkiem, index) =>
                        this.TimKiemStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
                    );
                case 11:
                    if (!this.searchText) return this.list_staff;
                    return this.list_staff.filter((_timkiem, index) =>
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

        updateList_m() {
            this.getList_m()
        },

        updateList_t() {
            this.getList_t()
        },

        getList_y() {
            try {
                if (!this.messages || this.messages.length === 0) {
                    return [];
                }

                // Parse JSON và lọc tin nhắn hợp lệ
                let parsedMessages = this.messages
                    .map((msg) => {
                        try {
                            if (!msg) return null;

                            let parsedMsg = typeof msg === "string" ? JSON.parse(msg) : msg;
                            let data = parsedMsg?.data ? JSON.parse(parsedMsg.data) : parsedMsg;

                            // Loại bỏ tin nhắn có nội dung "Welcome to WebSocket server!"
                            if (data?.message === "Welcome to WebSocket server!") {
                                return null;
                            }

                            return data;
                        } catch (error) {
                            return null;
                        }
                    })
                    .filter((item) => item !== null); // Loại bỏ giá trị null
                // this.messages = this.removeIfCancelled(parsedMessages)
                return this.removeIfCancelled(parsedMessages);
            } catch (error) {
                console.error("Lỗi trong getList_y:", error);
                return [];
            }
        }
    },


    methods: {
        update_message(id) {
            this.list_m = this.list_m.filter(item => item._id !== id)
        },

        async update_y() {
            try {
                // if(!this.isUpdated)
                this.messages = await TheodoiService.get_trangthai('y')
            } catch (error) {
                console.log(error)
            }
        },

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

        async update_slSach_t(id) {
            try {
                console.log(id)
                let Sach = await SachService.get(id);
                console.log(Sach)
                Sach.soquyenSach = Sach.soquyenSach + 1;
                await SachService.update(id, Sach)
                this.wsService.sendMessage(JSON.stringify(Sach));
            } catch (error) {
                console.log(error)
            }
        },

        async update_Sach(book) {
            try {
                console.log(book)
                this.wsService.sendMessage(JSON.stringify(book));
            } catch (error) {
                console.log(error)
            }
        },

        async update_slSach_m(id) {
            try {
                console.log(id)
                let Sach = await SachService.get(id);
                console.log(Sach)
                Sach.soquyenSach = Sach.soquyenSach - 1;
                await SachService.update(id, Sach)
                this.wsService.sendMessage(JSON.stringify(Sach));
            } catch (error) {
                console.log(error)
            }
        },

        updateList_y(list) {
            this.messages = list
        },

        async retrieveBooks() {
            try {
                this.list_book = await SachService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveUser() {
            try {
                this.list_user = await DocgiaService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveStaff() {
            try {
                this.list_staff = await nhanvienService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async getList_m() {
            try {
                this.list_m = await TheodoiService.get_trangthai('m');
            } catch (error) {
                console.log(error);
            }
        },

        async getList_t() {
            try {
                this.list_t = await TheodoiService.get_trangthai('t');
            } catch (error) {
                console.log(error);
            }
        },

        async retrieveNXB() {
            try {
                this.list_nxb = await NXBService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        async createStaff(data) {
            try {
                await nhanvienService.create(data);
                await this.retrieveStaff()
                alert('Nhân viên được thêm thành công.');
            } catch (error) {
                console.log(error);
            }
        },

        async createUser(data) {
            try {
                await DocgiaService.create(data);
                await this.retrieveUser()
                alert('Độc giả được thêm thành công.');
            } catch (error) {
                console.log(error);
            }
        },

        async createBook(data) {
            try {
                console.log(data)
                await SachService.create(data);
                this.wsService.sendMessage(data);
                await this.retrieveBooks()
                alert('Sách được thêm thành công.');
            } catch (error) {
                console.log(error);
            }
        },

        async createNXB(data) {
            try {
                await NXBService.create(data);
                await this.retrieveNXB()
                alert('Nhà xuất bản được thêm thành công.');
            } catch (error) {
                console.log(error);
            }
        },

        async deleteStaff(user) {
            if (confirm("Bạn muốn xóa nhân viên này?")) {
                try {
                    await nhanvienService.delete(user._id);
                    await this.retrieveStaff()
                } catch (error) {
                    console.log(error);
                }
            }
        },

        async deleteUser(user) {
            if (confirm("Bạn muốn xóa đọc giả này?")) {
                try {
                    await DocgiaService.delete(user._id);
                    this.retrieveUser()
                } catch (error) {
                    console.log(error);
                }
            }
        },

        async deleteBook(book) {
            try {
                await SachService.delete(book._id);
                book.trangthai = "huy"
                this.wsService.sendMessage(book);
                this.retrieveBooks()
                alert('Xóa sách thành công.');
            } catch (error) {
                console.log(error);
            }
        },

        async deleteNXB(NXB) {
            try {
                await NXBService.delete(NXB._id)
                alert("Xóa nhà xuất bản thành công");
            } catch (error) {
                console.log(error);
            }
        },

        logout() {
            this.$router.push({ name: "loginform" })
        },

        async getUser() {
            this.user = await nhanvienService.get(sessionStorage.getItem("userId"));
            if (!this.user) {
                this.$router.replace({ name: "loginform" });
            }
            this.role = this.$route.name === "docgia" ? "Độc giả" : "Nhân viên";
        },

        async updateTTtheodoi(data) {
            try {
                await TheodoiService.update(data._id, data)
            } catch (error) {
                console.log(error)
            }
        },

        async updateTTtheodoi_t(data) {
            try {
                await TheodoiService.update(data._id, data)
            } catch (error) {
                console.log(error)
            }
        },

        refreshList() {
            this.pick_nav = 0,
                this.list_book = []
            this.list_user = []
            this.list_staff = []
            this.list_y = []
            this.server = null
            this.activeIndex = -1

        },

        sendMessage() {
            if (this.newMessage) {
                this.wsService.sendMessage(this.newMessage);  // Gửi tin nhắn qua WebSocket
                this.newMessage = ''; // Xóa input sau khi gửi
            }
        },

        onMessageReceived(data) {
            console.log('Received data:', data);
            this.messages.push(data);
        },
    },

    mounted() {
        this.getUser()
        this.getList_t()
        this.getList_m()
        this.update_y()
        this.retrieveBooks()
        this.retrieveUser()
        this.retrieveStaff()
        // this.retrieveBorrow()
        this.retrieveNXB()
        this.refreshList();
    },

    created() {
        try {

            this.wsService = new WebSocketService('ws://localhost:3001/');  // Khởi tạo kết nối
            this.wsService.connect();  // Mở kết nối WebSocket
            // console.log(this.messages)
            // Đăng ký để nhận thông tin từ WebSocket
            this.wsService.onopen = () => {
                console.log('WebSocket connection established');
            };
            this.wsService.addListener(this.onMessageReceived);
            this.wsService.onMessage((message) => {
                console.log("Received message:", message);
                this.messages.push(message);  // Cập nhật danh sách tin nhắn
            });
        } catch (error) {
            console.error("Error in created hook:", error);
        }
    },

    beforeDestroy() {
        // Đảm bảo đóng kết nối khi component bị huỷ
        if (this.wsService) {
            this.wsService.removeListener(this.onMessageReceived);
            this.wsService.close();
        }
    },
};
</script>

<style scoped>
.navbar {
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    padding: 15px 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
}

.navbar h3 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

.navbar img {
    border-radius: 50%;
    border: 3px solid white;
}

.dropdown-menu {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
    transition: background 0, 2s;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}

/* Sidebar */
#sidebar {
    padding: 15px;
    min-height: 100vh;
    color: rgb(0, 0, 0);
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
}

.list-group-item {
    background: transparent;
    color: rgb(0, 0, 0);
    border: none;
    font-size: 16px;
    padding: 12px 15px;
    transition: background 0.3s, transform 0.2s;
}

.list-group-item:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
}

.list-group-item span {
    font-weight: bold;
}

/* Main Content */
main {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}


/* Modal */
.modal-content {
    border-radius: 8px;
    padding: 15px;
}

/* Search Bar */
.search-bar {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar input {
    border: none;
    outline: none;
    padding: 8px;
    width: 100%;
    font-size: 16px;
}

.search-bar button {
    border: none;
    padding: 8px 12px;
    border-radius: 50px;
    cursor: pointer;
    transition: background 0.3s;
}

.dropdown-menu {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(93, 177, 255, 0.527);
}

.page {
    text-align: left;
    max-width: 750px;
}
</style>