<!-- <template>
  <div class="page">
    <LoginForm @submit:form="login" />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import LoginForm from "@/components/LoginForm.vue";
import DocgiaService from "@/services/docgia.service";
import NhanvienService from "@/services/nhanvien.service";
import Profile from "@/components/Profile.vue";
import bcrypt from "bcryptjs";
export default {
  components: {
    LoginForm,
    Profile,
  },

  data() {
    return {
      server: null,
      message: "",
      router: useRouter(),
      authStore: useAuthStore(),
    };
  },

  methods: {
    async login(LoginForm) {
      try {
        const docgia = await DocgiaService.get_user(LoginForm.userInput);
        const nhanvien = await NhanvienService.get_user(LoginForm.userInput);
        if (docgia[0] !== undefined) {
          const isMatch = await bcrypt.compare(
            LoginForm.passInput,
            docgia[0].matkhauDG
          );
          if (isMatch) {
            this.authStore.setUser({ id: docgia[0]._id });
            sessionStorage.setItem("userId", docgia[0]._id);
            this.router.replace({ name: "docgia" });
          } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
          }
          // this.$router.push({ name: "docgia", query: { id: docgia[0]._id } });
        } else if (nhanvien[0]) {
          const isMatch = await bcrypt.compare(
            LoginForm.passInput,
            nhanvien[0].matkhauNV
          );
          if (isMatch) {
            this.authStore.setUser({ id: nhanvien[0]._id });
            sessionStorage.setItem("userId", nhanvien[0]._id);
            this.router.replace({ name: "nhanvien" });
          } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
          }
          // this.$router.push({ name: "nhanvien", query: { id: nhanvien[0]._id } });
        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    refreshList() {
      (this.userInput = ""), (this.userPass = "");
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 1650px;
}
</style> -->


<template>
  <div class="page">
    <LoginForm @submit:form="login" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import LoginForm from "@/components/LoginForm.vue";
import DocgiaService from "@/services/docgia.service";
import NhanvienService from "@/services/nhanvien.service";
import bcrypt from "bcryptjs";

export default {
  components: {
    LoginForm,
  },

  data() {
    return {
      message: "",
      router: useRouter(),
      authStore: useAuthStore(),
    };
  },

  methods: {
    async login(LoginForm) {
      try {
        const docgia = await DocgiaService.get_user(LoginForm.userInput);
        const nhanvien = await NhanvienService.get_user(LoginForm.userInput);
        if (docgia[0] !== undefined) {
          const isMatch = await bcrypt.compare(
            LoginForm.passInput,
            docgia[0].matkhauDG
          );
          if (isMatch) {
            this.authStore.setUser({ id: docgia[0]._id });
            sessionStorage.setItem("userId", docgia[0]._id);
            this.router.replace({ name: "docgia" });
          } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
          }
        } else if (nhanvien[0]) {
          const isMatch = await bcrypt.compare(
            LoginForm.passInput,
            nhanvien[0].matkhauNV
          );
          if (isMatch) {
            this.authStore.setUser({ id: nhanvien[0]._id });
            sessionStorage.setItem("userId", nhanvien[0]._id);
            this.router.replace({ name: "nhanvien" });
          } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
          }
        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
      } catch (error) {
        console.log(error);
        this.router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    goToForgotPassword() {
      this.router.push({ name: "ForgotPassword" });
    },
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 1650px;
}
</style>