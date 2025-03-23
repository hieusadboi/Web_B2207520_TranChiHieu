<!-- <template>

  <body style="
      background-image: url(&quot;https://i.postimg.cc/DZ1LNQft/Background.jpg&quot;);
      background-size: cover;
    ">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <h1>Chào mừng bạn đến với thư viện</h1>

        <form>
          <input type="text" id="login" class="fadeIn second" name="login" placeholder="Tài Khoản" v-model="userInput"
            @blur="validateInput('userInput')" />
          <p v-if="userError" class="error">{{ userError }}</p>

          <input type="password" id="password" class="fadeIn third" name="login" placeholder="Mật Khẩu"
            v-model="passInput" @blur="validateInput('passInput')" />
          <p v-if="passError" class="error">{{ passError }}</p>

          <input type="button" class="fadeIn fourth" @click="submit" value="Đăng Nhập" />
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
    validateInput(field) {
      if (field === "userInput") {
        this.userError = this.userInput ? "" : "Tài khoản không được để trống!";
      }
      if (field === "passInput") {
        this.passError = this.passInput ? "" : "Mật khẩu không được để trống!";
      }
    },

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

.error {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}
</style> -->

<!-- <template>

  <body style="
      background-image: url(&quot;https://i.postimg.cc/DZ1LNQft/Background.jpg&quot;);
      background-size: cover;
    ">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <h1>Chào mừng bạn đến với thư viện</h1>

        <form v-if="!forgotPasswordMode">
          <input type="text" id="login" class="fadeIn second" name="login" placeholder="Tài Khoản" v-model="userInput"
            @blur="validateInput('userInput')" />
          <p v-if="userError" class="error">{{ userError }}</p>

          <input type="password" id="password" class="fadeIn third" name="login" placeholder="Mật Khẩu"
            v-model="passInput" @blur="validateInput('passInput')" />
          <p v-if="passError" class="error">{{ passError }}</p>

          <input type="button" class="fadeIn fourth" @click="submit" value="Đăng Nhập" />
          <input type="button" class="fadeIn fifth" @click="toggleForgotPasswordMode">Quên mật khẩu/>
        </form>

        <form v-else>
          <input type="text" id="userId" class="fadeIn second" name="userId" placeholder="Nhập ID của bạn"
            v-model="userId" />
          <input type="email" id="email" class="fadeIn third" name="email" placeholder="Nhập email của bạn"
            v-model="email" />
          <input type="button" class="fadeIn fourth" @click="handleForgotPassword" value="Gửi yêu cầu" />
          <input type="button" class="fadeIn fifth" @click="toggleForgotPasswordMode">Quay lại/>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
import DocgiaService from "@/services/docgia.service";
import NhanvienService from "@/services/nhanvien.service";

export default {
  emits: ["submit:form"],

  data() {
    return {
      userInput: "",
      passInput: "",
      userError: "",
      passError: "",
      forgotPasswordMode: false,
      userId: "",
      email: "",
    };
  },

  methods: {
    validateInput(field) {
      if (field === "userInput") {
        this.userError = this.userInput ? "" : "Tài khoản không được để trống!";
      }
      if (field === "passInput") {
        this.passError = this.passInput ? "" : "Mật khẩu không được để trống!";
      }
    },

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

    async handleForgotPassword() {
      try {
        console.log("Gửi yêu cầu quên mật khẩu với ID:", this.userId, "Email:", this.email);

        let success = false;
        let errorMessage = "";

        // Gọi API cho Độc Giả
        try {
          const responseDocgia = await DocgiaService.forgotPassword(this.userId, this.email);
          console.log("Phản hồi từ API Độc Giả:", responseDocgia);
          if (responseDocgia.success) {
            success = true;
          }
        } catch (error) {
          const message = error.response?.data?.message || "Lỗi từ API Độc Giả.";
          console.error("Lỗi từ API Độc Giả:", message);
          if (!message.includes("Không tìm thấy")) {
            errorMessage = message;
          }
        }

        // Gọi API cho Nhân Viên nếu chưa thành công
        try {
          const responseNhanvien = await NhanvienService.forgotPassword(this.userId, this.email);
          console.log("Phản hồi từ API Nhân Viên:", responseNhanvien);
          if (responseNhanvien.success) {
            success = true;
          }
        } catch (error) {
          const message = error.response?.data?.message || "Lỗi từ API Nhân Viên.";
          console.error("Lỗi từ API Nhân Viên:", message);
          if (!message.includes("Không tìm thấy")) {
            errorMessage = message;
          }
        }

        // Hiển thị thông báo dựa trên kết quả
        if (success) {
          alert("Mật khẩu đã được cấp lại.");
          this.toggleForgotPasswordMode();
        } else if (errorMessage.includes("Email không khớp")) {
          alert("Tài khoản không khớp với email.");
        } else {
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }

      } catch (error) {
        console.error("Lỗi không mong muốn:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    },

    toggleForgotPasswordMode() {
      this.forgotPasswordMode = !this.forgotPasswordMode;
    },
  },
};
</script>

<style scoped>
@import "@/assets/loginform.css";

.error {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}
</style> -->


<template>

  <body style="
      background-image: url('https://i.postimg.cc/DZ1LNQft/Background.jpg');
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    ">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <h1 class="title">Chào mừng bạn đến thư viện</h1>

        <!-- Form đăng nhập -->
        <form v-if="!forgotPasswordMode" class="form-container">
          <input type="text" id="login" class="fadeIn second input-field" name="login" placeholder="Tài Khoản"
            v-model="userInput" @blur="validateInput('userInput')" />
          <p v-if="userError" class="error-message">{{ userError }}</p>

          <input type="password" id="password" class="fadeIn third input-field" name="password" placeholder="Mật Khẩu"
            v-model="passInput" @blur="validateInput('passInput')" />
          <p v-if="passError" class="error-message">{{ passError }}</p>

          <button type="button" class="fadeIn fourth btn" @click="submit">Đăng Nhập</button>
          <button type="button" class="fadeIn fifth btn-link" @click="toggleForgotPasswordMode">
            Quên mật khẩu?
          </button>
        </form>

        <!-- Form quên mật khẩu -->
        <form v-else class="form-container">
          <input type="text" id="userId" class="fadeIn second input-field" name="userId"
            placeholder="Nhập tài khoản của bạn" v-model="userId" />
          <input type="email" id="email" class="fadeIn third input-field" name="email" placeholder="Nhập email của bạn"
            v-model="email" />
          <button type="button" class="fadeIn fourth btn" @click="handleForgotPassword">
            Gửi yêu cầu
          </button>
          <button type="button" class="fadeIn fifth btn-link" @click="toggleForgotPasswordMode">
            Quay lại
          </button>
        </form>
      </div>
    </div>
  </body>
</template>


<script>
import DocgiaService from "@/services/docgia.service";
import NhanvienService from "@/services/nhanvien.service";

export default {
  emits: ["submit:form"],

  data() {
    return {
      userInput: "",
      passInput: "",
      userError: "",
      passError: "",
      forgotPasswordMode: false,
      userId: "",
      email: "",
    };
  },

  methods: {
    validateInput(field) {
      if (field === "userInput") {
        this.userError = this.userInput ? "" : "Tài khoản không được để trống!";
      }
      if (field === "passInput") {
        this.passError = this.passInput ? "" : "Mật khẩu không được để trống!";
      }
    },

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

    async handleForgotPassword() {
      try {
        console.log("Gửi yêu cầu quên mật khẩu với ID:", this.userId, "Email:", this.email);

        let success = false;
        let errorMessage = "";

        // Gọi API cho Độc Giả
        try {
          const responseDocgia = await DocgiaService.forgotPassword(this.userId, this.email);
          console.log("Phản hồi từ API Độc Giả:", responseDocgia);
          if (responseDocgia.success) {
            success = true;
          }
        } catch (error) {
          const message = error.response?.data?.message || "Lỗi từ API Độc Giả.";
          console.error("Lỗi từ API Độc Giả:", message);
          if (!message.includes("Không tìm thấy")) {
            errorMessage = message;
          }
        }

        // Gọi API cho Nhân Viên nếu chưa thành công
        try {
          const responseNhanvien = await NhanvienService.forgotPassword(this.userId, this.email);
          console.log("Phản hồi từ API Nhân Viên:", responseNhanvien);
          if (responseNhanvien.success) {
            success = true;
          }
        } catch (error) {
          const message = error.response?.data?.message || "Lỗi từ API Nhân Viên.";
          console.error("Lỗi từ API Nhân Viên:", message);
          if (!message.includes("Không tìm thấy")) {
            errorMessage = message;
          }
        }

        // Hiển thị thông báo dựa trên kết quả
        if (success) {
          alert("Mật khẩu đã được cấp lại.");
          this.toggleForgotPasswordMode();
        } else if (errorMessage.includes("Email không khớp")) {
          alert("Tài khoản không khớp với email.");
        } else {
          alert("Có lỗi xảy ra, vui lòng thử lại.");
        }

      } catch (error) {
        console.error("Lỗi không mong muốn:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    },

    toggleForgotPasswordMode() {
      this.forgotPasswordMode = !this.forgotPasswordMode;
    },
  },
};
</script>


<!-- <style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#formContent {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

.title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-link {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 10px;
}

.btn-link:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: -5px;
}
</style> -->

<style scoped>
@import "@/assets/loginform.css";

/* Hiển thị lỗi */
.error {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}
</style>