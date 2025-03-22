<template>
    <form class="input-group" style="width: 400px">
      <input 
      type="search" 
      class="form-control" 
      placeholder="Nhập từ khóa cần tìm kiếm" 
      aria-label="Search" 
        @input="updateModelValue"
        @keyup.enter="submit"/>
      <button class="btn btn-outline-primary" type="reset" @click="updateModelValue" data-mdb-ripple-init data-mdb-ripple-color="dark" style="padding: .45rem 1.5rem .35rem;">
        Reset
      </button>
    </form>
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
                this.$emit("submit");
            },
        },

    }
</script>