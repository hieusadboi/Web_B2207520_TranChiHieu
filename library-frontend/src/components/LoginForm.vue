<template>
  <body
    style="
      background-image: url(&quot;https://i.postimg.cc/DZ1LNQft/Background.jpg&quot;);
      background-size: cover;
    "
  >
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
        <h1>Chào mừng bạn đến với thư viện</h1>

        <!-- Login Form -->
        <form>
          <!-- Input Tài Khoản -->
          <input
            type="text"
            id="login"
            class="fadeIn second"
            name="login"
            placeholder="Tài Khoản"
            v-model="userInput"
            @blur="validateInput('userInput')"
          />
          <p v-if="userError" class="error">{{ userError }}</p>

          <!-- Input Mật Khẩu -->
          <input
            type="password"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="Mật Khẩu"
            v-model="passInput"
            @blur="validateInput('passInput')"
          />
          <p v-if="passError" class="error">{{ passError }}</p>

          <!-- Nút Đăng Nhập -->
          <input
            type="button"
            class="fadeIn fourth"
            @click="submit"
            value="Đăng Nhập"
          />
        </form>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  emits: ["submit:form"],

  data() {
    return {
      userInput: "",
      passInput: "",
      userError: "",
      passError: "",
    };
  },

  methods: {
    // Kiểm tra input khi rời khỏi ô nhập liệu (blur)
    validateInput(field) {
      if (field === "userInput") {
        this.userError = this.userInput ? "" : "Tài khoản không được để trống!";
      }
      if (field === "passInput") {
        this.passError = this.passInput ? "" : "Mật khẩu không được để trống!";
      }
    },

    // Gửi sự kiện khi nhấn "Đăng Nhập"
    submit() {
      this.validateInput("userInput");
      this.validateInput("passInput");

      if (this.userInput && this.passInput) {
        this.$emit("submit:form", {
          userInput: this.userInput,
          passInput: this.passInput,
        });
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/loginform.css";

/* Hiển thị lỗi */
.error {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}
</style>
