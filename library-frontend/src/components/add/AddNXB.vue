<!-- <template>
    <Form :validation-schema="contactFormSchema" @submit="submitNXB" class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">Mã nhà xuất bản</label>
            <Field type="text" name="id" class="form-control" placeholder="..." v-model="LocalNXB._id" />
            <ErrorMessage name="id" class="text-danger" />
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Tên nhà xuất bản</label>
            <Field type="text" name="name" class="form-control" placeholder="Nguyen Van A" v-model="LocalNXB.tenNXB" />
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label" name="diachiDG">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="1234 Main St"v-model="LocalNXB.diachiNXB"/>
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>        
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset"  class="btn btn-outline-success">Reset</button>
            <button type="submit"  class="btn btn-primary" @click="submitNXB">Thêm</button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
        components:{
            Form, Field, ErrorMessage
        },
        emits: ["submit:nxb"],
        data() {
            const contactFormSchema = yup.object().shape({
                id: yup
                    .string()
                    .required("Phải nhập ID.")
                    .max(5, "ID có nhiều nhất 5 ký tự."),
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                inputAddress: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .max(100, "Địa chỉ tối đa 100 ký tự."),
            });

            return {
                LocalNXB: { 
                    _id: "", 
                    tenNXB: "", 
                    diachiNXB: "", 
                },
                contactFormSchema,
            };
        },
        methods: {
            submitNXB() {
                this.$emit("submit:nxb", this.LocalNXB);
            },

        },
    };
</script> -->


<template>
    <Form :validation-schema="contactFormSchema" @submit="submitNXB" class="row g-3">
        <!-- Mã nhà xuất bản -->
        <div class="col-md-3">
            <label class="form-label" for="id">Mã nhà xuất bản</label>
            <Field type="text" name="id" class="form-control" placeholder="NXB..." v-model="LocalNXB._id"
                @input="checkDuplicate" />
            <ErrorMessage name="id" class="text-danger" />
            <span v-if="duplicateWarning" class="text-danger">{{ duplicateWarning }}</span>
        </div>

        <!-- Tên nhà xuất bản -->
        <div class="col-md-6">
            <label class="form-label" for="name">Tên nhà xuất bản</label>
            <Field type="text" name="name" class="form-control" placeholder="Nhà Xuất Bản ..."
                v-model="LocalNXB.tenNXB" />
            <ErrorMessage name="name" class="text-danger" />
        </div>

        <!-- Địa chỉ -->
        <div class="col-12">
            <label for="inputAddress" class="form-label">Địa chỉ</label>
            <Field type="text" class="form-control" name="inputAddress" placeholder="..."
                v-model="LocalNXB.diachiNXB" />
            <ErrorMessage name="inputAddress" class="text-danger" />
        </div>

        <!-- Nút bấm -->
        <div class="col-12">
            <button style="margin-right: 20px;" type="reset" class="btn btn-outline-success">Reset</button>
            <button type="submit" class="btn btn-primary" :disabled="!!duplicateWarning">Thêm</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NXBService from "@/services/nxb.service";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:nxb"],
    data() {
        const contactFormSchema = yup.object().shape({
            id: yup
                .string()
                .required("Phải nhập mã nhà xuất bản.")
                .max(7, "Mã nhà xuất bản có nhiều nhất 7 ký tự."),
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            inputAddress: yup
                .string()
                .required("Phải có địa chỉ.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
        });

        return {
            LocalNXB: {
                _id: "",
                tenNXB: "",
                diachiNXB: "",
            },
            duplicateWarning: "",
            contactFormSchema,
        };
    },
    methods: {
        // Kiểm tra mã nhà xuất bản trùng lặp
        async checkDuplicate() {
            if (this.LocalNXB._id) {
                try {
                    const existingNXB = await NXBService.get(this.LocalNXB._id);
                    this.duplicateWarning = existingNXB ? "Mã nhà xuất bản đã tồn tại!" : "";
                } catch (error) {
                    this.duplicateWarning = "";
                }
            } else {
                this.duplicateWarning = "";
            }
        },
        // Gửi dữ liệu lên backend nếu hợp lệ
        submitNXB() {
            if (this.duplicateWarning) {
                alert("Mã nhà xuất bản đã tồn tại, không thể thêm mới!");
                return;
            }
            this.$emit("submit:nxb", this.LocalNXB);
        },
    },
};
</script>
