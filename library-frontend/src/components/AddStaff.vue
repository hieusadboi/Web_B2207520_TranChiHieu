<!-- <template>
    <Form :validation-schema="contactFormSchema" @submit="submitStaff" class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">Mã nhân viên</label>
            <Field type="text" name="id" class="form-control" placeholder="NV..." v-model="LocalStaff._id" />
            <ErrorMessage name="id" class="text-danger" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Họ và tên</label>
            <Field type="text" name="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalStaff.tenNV" />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label class="form-label" for="role">Chức vụ</label>
            <Field as="select" name="role" class="form-control" v-model="LocalStaff.chucvuNV">
                <option value="quanly">Quản lý</option>
                <option value="admin">Admin</option>
            </Field>
            <ErrorMessage name="role" class="text-danger" />
        </div>

        <div class="col-md-5">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <Field type="text" class="form-control" name="sdt" v-model="LocalStaff.dienthoaiNV" />
            <ErrorMessage name="sdt" class="text-danger" />
        </div>

        <div class="col-md-6">
            <label class="form-label" for="name">Email</label>
            <Field type="text" name="email" class="form-control" placeholder="example@gmail.com"
                v-model="LocalStaff.emailNV" />
            <ErrorMessage name="email" class="text-danger" />
        </div>

        <div class="col-12">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="1234 Main St"
                v-model="LocalStaff.diachiNV" />
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset" class="btn btn-outline-success">Reset</button>
            <button type="submit" class="btn btn-primary" @click="submitStaff">Tạo</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form, Field, ErrorMessage
    },
    emits: ["submit:staff"],
    data() {
        const contactFormSchema = yup.object().shape({
            id: yup
                .string()
                .required("Phải nhập mã nhân viên.")
                .min(3, "Mã nhân viên có ít nhất 3 ký tự")
                .max(12, "Mã nhân viên nhiều nhất có 12 ký tự")
                .matches(/^NV/, "Mã nhân viên phải bắt đầu bằng 'NV'"),
            name: yup
                .string()
                .required("Phải cung cấp họ và tên.")
                .min(6, "Họ và tên phải ít nhất 6 ký tự.")
                .max(50, "Họ và tên có nhiều nhất 50 ký tự."),
            sdt: yup
                .string()
                .min(10, "Số điện thoại phải có 10 ký tự.")
                .max(10, "Số điện thoại phải có 10 ký tự.")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            role: yup
                .string()
                .required("Thiếu chức vụ.")
                .oneOf(["quanly", "admin"], "Chức vụ phải là 'quản lý' hoặc 'admin'"),
            inputAddress: yup
                .string()
                .required("Tên phải có giá trị.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
        });
        return {
            LocalStaff: {
                _id: "",
                tenNV: "",
                diachiNV: "",
                dienthoaiNV: "",
                chucvuNV: "quanly",
            },
            contactFormSchema,
        };
    },
    methods: {
        submitStaff() {
            this.$emit("submit:staff", this.LocalStaff);
        },
    },
};
</script> -->


<template>
    <Form :validation-schema="contactFormSchema" @submit="submitStaff" class="row g-3">
        <!-- Mã nhân viên -->
        <div class="col-md-3">
            <label class="form-label" for="id">Mã nhân viên</label>
            <Field type="text" name="id" class="form-control" placeholder="NV..." v-model="LocalStaff._id"
                @input="checkDuplicate" />
            <ErrorMessage name="id" class="text-danger" />
            <span v-if="duplicateWarning" class="text-danger">{{ duplicateWarning }}</span>
        </div>

        <!-- Họ và tên -->
        <div class="col-md-6">
            <label class="form-label" for="name">Họ và tên</label>
            <Field type="text" name="name" class="form-control" placeholder="Nguyễn Văn A" v-model="LocalStaff.tenNV" />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <!-- Chức vụ -->
        <div class="col-md-6">
            <label class="form-label" for="role">Chức vụ</label>
            <Field as="select" name="role" class="form-control" v-model="LocalStaff.chucvuNV">
                <option value="quanly">Quản lý</option>
                <option value="admin">Admin</option>
            </Field>
            <ErrorMessage name="role" class="text-danger" />
        </div>

        <!-- Số điện thoại -->
        <div class="col-md-5">
            <label class="form-label" for="sdt">Số điện thoại</label>
            <Field type="text" class="form-control" name="sdt" v-model="LocalStaff.dienthoaiNV" />
            <ErrorMessage name="sdt" class="text-danger" />
        </div>

        <!-- Email -->
        <div class="col-md-6">
            <label class="form-label" for="email">Email</label>
            <Field type="text" name="email" class="form-control" placeholder="example@gmail.com"
                v-model="LocalStaff.emailNV" />
            <ErrorMessage name="email" class="text-danger" />
        </div>

        <!-- Địa chỉ -->
        <div class="col-12">
            <label for="inputAddress" class="form-label">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="1234 Main St"
                v-model="LocalStaff.diachiNV" />
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>

        <!-- Nút bấm -->
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset" class="btn btn-outline-success">Reset</button>
            <button type="submit" class="btn btn-primary" :disabled="!!duplicateWarning">Tạo</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NhanvienService from "@/services/nhanvien.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:staff"],
    data() {
        const contactFormSchema = yup.object().shape({
            id: yup
                .string()
                .required("Phải nhập mã nhân viên.")
                .min(3, "Mã nhân viên có ít nhất 3 ký tự.")
                .max(12, "Mã nhân viên nhiều nhất có 12 ký tự.")
                .matches(/^NV/, "Mã nhân viên phải bắt đầu bằng 'NV'"),
            name: yup
                .string()
                .required("Phải cung cấp họ và tên.")
                .min(6, "Họ và tên phải ít nhất 6 ký tự.")
                .max(50, "Họ và tên có nhiều nhất 50 ký tự."),
            sdt: yup
                .string()
                .required("Phải nhập số điện thoại.")
                .min(10, "Số điện thoại phải có 10 ký tự.")
                .max(10, "Số điện thoại phải có 10 ký tự.")
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ."),
            role: yup
                .string()
                .required("Thiếu chức vụ.")
                .oneOf(["quanly", "admin"], "Chức vụ phải là 'quản lý' hoặc 'admin'."),
            email: yup.string().email("Email không hợp lệ.").required("Phải nhập email."),
            inputAddress: yup.string().required("Phải nhập địa chỉ.").max(100, "Địa chỉ tối đa 100 ký tự."),
        });

        return {
            LocalStaff: {
                _id: "",
                tenNV: "",
                diachiNV: "",
                dienthoaiNV: "",
                chucvuNV: "quanly",
                emailNV: "",
            },
            duplicateWarning: "",
            contactFormSchema,
        };
    },
    methods: {
        // Kiểm tra mã nhân viên trùng lặp
        async checkDuplicate() {
            if (this.LocalStaff._id) {
                try {
                    const existingStaff = await NhanvienService.get(this.LocalStaff._id);
                    this.duplicateWarning = existingStaff ? "Mã nhân viên đã tồn tại!" : "";
                } catch (error) {
                    this.duplicateWarning = "";
                }
            } else {
                this.duplicateWarning = "";
            }
        },
        // Gửi dữ liệu lên backend nếu hợp lệ
        submitStaff() {
            if (this.duplicateWarning) {
                alert("Mã nhân viên đã tồn tại, không thể thêm mới!");
                return;
            }
            this.$emit("submit:staff", this.LocalStaff);
        },
    },
};
</script>
