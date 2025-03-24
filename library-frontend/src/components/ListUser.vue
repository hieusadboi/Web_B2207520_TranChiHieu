<template>
  <form>
    <div class="accordion-item" v-for="(element, index) in updatedl" :key="element._id"
      @click="updateActiveIndex(index)">

      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          :data-bs-target="'#' + element._id" aria-expanded="false" :aria-controls="element._id">
          <strong>Mã đọc giả: &nbsp; </strong> {{ element._id }}&nbsp;&nbsp;&nbsp;
          <strong>Tên đọc giả: &nbsp; </strong> {{ element.tenDG }}
        </button>
      </h2>
      <div :id="element._id" class="accordion-collapse collapse">
        <div class="accordion-body">
          <p>Mã đọc giả: {{ element._id }}</p>
          <p>Tên đọc giả: {{ element.tenDG }}</p>
          <p>Ngày sinh: {{ element.ngaysinhDG }}</p>
          <p>Giới tính: {{ element.gioitinhDG }}</p>
          <p>Số điện thoại: {{ element.dienthoaiDG }}</p>
          <p>Địa chỉ email: {{ element.emailDG }}</p>
          <p>Địa chỉ: {{ element.diachiDG }}</p>
        </div>
        <button type="button" class="btn btn-danger m-3" @click="deleteuser($event, element)">
          <i class="fas fa-edit"></i> Xóa
        </button>

      </div>
    </div>
  </form>
</template>

<script>

export default {
  props: {
    list: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },

  data() {
    return {
      dl: [...this.list],
    }
  },

  computed: {
    updatedl() {
      this.dl = [...this.list]
      return this.dl
    }
  },

  emits: ["update:activeIndex", "delete:user"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },

    deleteuser(event, element) {
      event.preventDefault(); // Chặn hành vi mặc định của button

      if (confirm("Bạn có chắc muốn xóa không?")) {
        this.$emit("delete:user", element);
        this.dl = this.dl.filter(item => item._id !== element._id);
      }
    }
    ,
  },
};
</script>