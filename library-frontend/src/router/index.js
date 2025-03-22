import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import Login from "@/views/Login.vue";
import Docgia from "@/views/Docgia.vue";
import Nhanvien from "@/views/Nhanvien.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "loginform",
        component: Login,
    },

    {
        path: "/nhanvien/",
        name: "nhanvien",
        component: Nhanvien,
        meta: { requiresAuth: true },
    },

    {
        path: "/docgia",
        name: "docgia",
        component: Docgia,
        meta: { requiresAuth: true },
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.user) {
    // Nếu trang yêu cầu đăng nhập nhưng người dùng chưa đăng nhập, chuyển hướng về trang login
    next({ name: 'loginform' });
  } else {
    next(); // Nếu không có yêu cầu đăng nhập hoặc người dùng đã đăng nhập, tiếp tục
  }
});

export default router;