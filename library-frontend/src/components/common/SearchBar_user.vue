<template>
    <div class="input-group" style="width: 400px">
        <input type="search" class="form-control" placeholder="Nhập từ khóa cần tìm kiếm" aria-label="Search"
            @input="updateModelValue" />
        <button class="btn btn-outline-primary" type="button" @click="updateModelValue('')" data-mdb-ripple-init
            data-mdb-ripple-color="dark" style="padding: .45rem 1.5rem .35rem;">
            Reset
        </button>
    </div>
</template>

<script>
export default {
    props: {
        name_tag: { type: String, required: true },
        modelValue: { type: String, default: "" },
    },
    emits: ["update:modelValue"],
    methods: {
        updateModelValue(value) {
            this.$emit("update:modelValue", value.target ? value.target.value : value);
        }
    },
};
</script>
