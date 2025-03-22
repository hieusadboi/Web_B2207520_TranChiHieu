<template>
  <div class="container">
    <div class="card">
      <p>
        Oops, không thể tìm thấy trang. Trở về
        <router-link to="/">trang chủ.</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f9f9f9;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 10px 10px rgba(0, 0, 0, 0.05);
}
</style>
