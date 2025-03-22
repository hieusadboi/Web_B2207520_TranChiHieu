<!-- <template>
  <Form
    :validation-schema="contactFormSchema"
    @submit="submitUser"
    class="row g-3"
  >
    <div class="col-md-3">
      <label class="form-label" for="id">Mã đọc giả</label>
      <Field
        type="text"
        name="id"
        class="form-control"
        placeholder="DG..."
        v-model="LocalUser._id"
      />
      <ErrorMessage name="id" class="text-danger" />
    </div>
    <div class="col-md-6">
      <label class="form-label" for="name">Họ và tên</label>
      <Field
        type="text"
        name="name"
        class="form-control"
        placeholder="Họ và tên"
        v-model="LocalUser.tenDG"
      />
      <ErrorMessage name="name" class="text-danger" />
    </div>
    <div class="col-md-5">
      <label class="form-label" for="sdt">Số điện thoại</label>
      <Field
        type="text"
        class="form-control"
        name="sdt"
        v-model="LocalUser.dienthoaiDG"
      />
      <ErrorMessage name="sdt" class="text-danger" />
    </div>
    <div class="col-md-4">
      <label class="form-label" for="born">Ngày sinh</label>
      <Field
        type="date"
        name="born"
        class="form-control"
        v-model="LocalUser.ngaysinhDG"
      />
      <ErrorMessage name="born" class="text-danger" />
    </div>

    <div class="col-md-3">
      <label for="inputState" class="form-label">Giới tính</label>
      <Field
        as="select"
        name="gioitinh"
        class="form-select"
        v-model="LocalUser.gioitinhDG"
      >
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
      </Field>
      <ErrorMessage name="gioitinh" class="text-danger" />
    </div>
    <div class="col-md-6">
      <label class="form-label" for="email">Email</label>
      <Field
        type="email"
        name="email"
        class="form-control"
        placeholder="example@gmail.com"
        v-model="LocalUser.emailDG"
      />
      <ErrorMessage name="email" class="text-danger" />
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label" name="diachiDG"
        >Địa chỉ</label
      >
      <Field
        type="text"
        class="form-control"
        name="inputAddress"
        placeholder="1234 Main St"
        v-model="LocalUser.diachiDG"
      />
      <ErrorMessage name="inputAddress" class="text-danger" />
    </div>
    <div class="col-12">
      <button
        style="margin-right: 20px"
        type="reset"
        class="btn btn-outline-success"
      >
        Reset
      </button>
      <button type="submit" class="btn btn-primary">Tạo</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user"],
  data() {
    const contactFormSchema = yup.object().shape({
      id: yup
        .string()
        .required("Phải nhập mã đọc giả.")
        .min(3, "Mã đọc giả phải có ít nhất 3 ký tự")
        .max(12, "Mã đọc giả nhiều nhất có 12 ký tự")
        .matches(/^DG/, "Mã đọc giả phải bắt đầu bằng 'DG'"),
      name: yup
        .string()
        .required("Phải cung cấp họ và tên.")
        .min(6, "Họ và tên phải ít nhất 6 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      sdt: yup
        .string()
        .min(10, "Số điện thoại phải có 10 ký tự.")
        .max(10, "Số điện thoại phải có 10 ký tự.")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      born: yup
        .date()
        .required("Phải có ngày tháng.")
        .max(new Date(), "Ngày sinh không thể lớn hơn ngày hôm nay."),

      email: yup
        .string()
        .required("Phải nhập email.")
        .email("Email không hợp lệ.")
        .max(50, "Email tối đa 50 ký tự."),

      inputAddress: yup
        .string()
        .required("Phải cung cấp địa chỉ.")
        .max(100, "Địa chỉ tối đa 100 ký tự."),
    });
    return {
      LocalUser: {
        _id: "",
        tenDG: "",
        diachiDG: "",
        dienthoaiDG: "",
        ngaysinhDG: "",
        gioitinhDG: "Nam",
        emailDG: "",
      },
      contactFormSchema,
    };
  },
  methods: {
    submitUser() {
      this.$emit("submit:user", this.LocalUser);
    },
  },
};
</script> -->


<template>
  <Form :validation-schema="contactFormSchema" @submit="submitUser" class="row g-3">
    <!-- Mã đọc giả -->
    <div class="col-md-3">
      <label class="form-label" for="id">Mã đọc giả</label>
      <Field type="text" name="id" class="form-control" placeholder="DG..." v-model="LocalUser._id"
        @input="checkDuplicate" />
      <ErrorMessage name="id" class="text-danger" />
      <span v-if="duplicateWarning" class="text-danger">{{ duplicateWarning }}</span>
    </div>

    <!-- Họ và tên -->
    <div class="col-md-6">
      <label class="form-label" for="name">Họ và tên</label>
      <Field type="text" name="name" class="form-control" placeholder="Họ và tên" v-model="LocalUser.tenDG" />
      <ErrorMessage name="name" class="text-danger" />
    </div>

    <!-- Số điện thoại -->
    <div class="col-md-5">
      <label class="form-label" for="sdt">Số điện thoại</label>
      <Field type="text" class="form-control" name="sdt" v-model="LocalUser.dienthoaiDG" />
      <ErrorMessage name="sdt" class="text-danger" />
    </div>

    <!-- Ngày sinh -->
    <div class="col-md-4">
      <label class="form-label" for="born">Ngày sinh</label>
      <Field type="date" name="born" class="form-control" v-model="LocalUser.ngaysinhDG" />
      <ErrorMessage name="born" class="text-danger" />
    </div>

    <!-- Giới tính -->
    <div class="col-md-3">
      <label for="inputState" class="form-label">Giới tính</label>
      <Field as="select" name="gioitinh" class="form-select" v-model="LocalUser.gioitinhDG">
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
        <option value="Khác">Khác</option>
      </Field>
      <ErrorMessage name="gioitinh" class="text-danger" />
    </div>

    <!-- Email -->
    <div class="col-md-6">
      <label class="form-label" for="email">Email</label>
      <Field type="email" name="email" class="form-control" placeholder="example@gmail.com"
        v-model="LocalUser.emailDG" />
      <ErrorMessage name="email" class="text-danger" />
    </div>

    <!-- Địa chỉ -->
    <div class="col-12">
      <label for="inputAddress" class="form-label">Địa chỉ</label>
      <Field type="text" class="form-control" name="inputAddress" placeholder="1234 Main St"
        v-model="LocalUser.diachiDG" />
      <ErrorMessage name="inputAddress" class="text-danger" />
    </div>

    <!-- Nút bấm -->
    <div class="col-12">
      <button style="margin-right: 20px" type="reset" class="btn btn-outline-success">
        Reset
      </button>
      <button type="submit" class="btn btn-primary" :disabled="!!duplicateWarning">
        Tạo
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import DocgiaService from "@/services/docgia.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user"],
  data() {
    const contactFormSchema = yup.object().shape({
      id: yup
        .string()
        .required("Phải nhập mã đọc giả.")
        .min(3, "Mã đọc giả phải có ít nhất 3 ký tự.")
        .max(12, "Mã đọc giả nhiều nhất có 12 ký tự.")
        .matches(/^DG/, "Mã đọc giả phải bắt đầu bằng 'DG'"),
      name: yup
        .string()
        .required("Phải cung cấp họ và tên.")
        .min(6, "Họ và tên phải ít nhất 6 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      sdt: yup
        .string()
        .min(10, "Số điện thoại phải có 10 ký tự.")
        .max(10, "Số điện thoại phải có 10 ký tự.")
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
      born: yup
        .date()
        .required("Phải có ngày tháng.")
        .max(new Date(), "Ngày sinh không thể lớn hơn ngày hôm nay."),
      email: yup
        .string()
        .required("Phải nhập email.")
        .email("Email không hợp lệ.")
        .max(50, "Email tối đa 50 ký tự."),
      inputAddress: yup
        .string()
        .required("Phải cung cấp địa chỉ.")
        .max(100, "Địa chỉ tối đa 100 ký tự."),
    });
    return {
      LocalUser: {
        _id: "",
        tenDG: "",
        diachiDG: "",
        dienthoaiDG: "",
        ngaysinhDG: "",
        gioitinhDG: "Nam",
        emailDG: "",
      },
      duplicateWarning: "", // Kiểm tra trùng lặp
      contactFormSchema,
    };
  },
  methods: {
    async checkDuplicate() {
      if (this.LocalUser._id) {
        try {
          const existingUser = await DocgiaService.get(this.LocalUser._id);
          if (existingUser) {
            this.duplicateWarning = "Mã độc giả đã tồn tại!";
          } else {
            this.duplicateWarning = "";
          }
        } catch (error) {
          this.duplicateWarning = "";
        }
      }
    },
    submitUser() {
      if (this.duplicateWarning) {
        alert("Mã đọc giả đã tồn tại, không thể thêm mới!");
        return;
      }
      this.$emit("submit:user", this.LocalUser);
    },
  },
};
</script>
