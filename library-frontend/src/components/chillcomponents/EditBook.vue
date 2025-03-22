<template>

    <Form :validation-schema="contactFormSchema" @submit="updatetBook" class="row g-3">
        <div class="col-md-3">
            <label class="form-label" for="id">ID:</label>
            <input type="text" name="id" class="form-control" placeholder="..." v-model="book._id" disabled/>
        </div>
        <div class="col-md-6">
            <label class="form-label" for="name">Tên sách</label>
            <Field type="text" name="name" class="form-control" placeholder="..." v-model="book.tenSach"/>
            <ErrorMessage name="name" class="text-danger" />
        </div>
        <div class="col-md-5">
            <label class="form-label" for="tacgia">Tác giả</label>
            <Field type="text" class="form-control" name="tacgia" placeholder="..." v-model="book.tacgia"/>
            <ErrorMessage name="tacgia" class="text-danger" />
        </div>
        <div class="col-md-5">
            <label class="form-label" for="maNXB">Mã nhà xuất bản</label>
            <Field type="text" class="form-control" name="maNXB" placeholder="..." v-model="book.maNXB"/>
            <ErrorMessage name="maNXB" class="text-danger" />
        </div>
        <div class="col-md-4">
            <label class="form-label" for="born">Năm xuất bản</label>
            <Field type="date" name="born" class="form-control" v-model="book.namXB"/>
            <ErrorMessage name="born" class="text-danger" />
        </div>
        
        <div class="col-md-3">
            <label for="number" class="form-label">Số quyển</label>
            <Field type="number" class="form-control" name="number" v-model="book.soquyenSach"/>
            <ErrorMessage name="number" class="text-danger" />
        </div>        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="updatetBook">Lưu thay đổi</button>
        </div>
    </Form>
</template>

<script>
import sachService from '@/services/sach.service';
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

    export default {
        components:{
            Form, Field, ErrorMessage
        },
        props: {
            book: {type: Object, required: true}
        },

        emits: ["send:book"],

        data(){
            const contactFormSchema = yup.object().shape({
                id: yup
                    .string()
                    .required("Phải nhập ID."),
                name: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                tacgia: yup
                    .string()
                    .required("Tên phải có giá trị.")
                    .min(2, "Tên phải ít nhất 2 ký tự.")
                    .max(50, "Tên có nhiều nhất 50 ký tự."),
                maNXB: yup.string().max(5, "Địa chỉ tối đa 5 ký tự."),
                born: yup
                    .date()
                    .required("Phải có ngày tháng.")
                    .max(new Date(), "Ngày xuất bản không thể lớn hơn ngày hôm nay."),
                number: yup
                    .number()
                    .required("Phải nhập số.")
                    .positive("Số phải là số dương.")
                    .integer("Số phải là số nguyên."),
            });
            return{
                contactFormSchema,
            }
        },
        methods: {
            async updatetBook  (){
                if (confirm("Hoàn tất!")) {
                    try {
                        this.$emit("send:book", this.book)
                        await sachService.update(this.book._id, this.book);
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
    }
</script>