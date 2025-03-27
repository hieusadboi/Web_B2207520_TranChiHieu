<template>
    <div class="navbar bg-body-tertiary container">
        <div class="row align-items-center w-100 justify-content-between">
            <!-- Tiêu đề bên phải -->
            <div class="col-md-6 ">
                <h4><strong>{{ name_tag }}</strong></h4>
            </div>
            <!-- Ô tìm kiếm bên trái -->
            <div class="col-md-6 text-end">
                <form class="d-flex" role="search">
                    <input 
                    class="form-control me-2 w-75" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    @input="updateModelValue"
                    @keyup.enter="submit">
                    <button class="btn btn-outline-success" type="reset" @click="updateModelValue">Reset</button>
                </form>
            </div>                            
            
        </div>
    </div>
</template>


<script>
    export default {
        props: {
            name_tag: {type: String, require: true},
            modelValue: { type: String, default: "" },
        },

        emits: ["submit", "update:modelValue"],
        methods: {
            updateModelValue(e) {
                this.$emit("update:modelValue", e.target.value);
            },
            submit() {
                this.$emit("update:modelValue", e.target.value);
            },
        },

    }
</script>