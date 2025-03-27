<template>
  <div class="not-found-container">
    <div class="not-found-card">
      <h1>404</h1>
      <p>Oops! Trang bạn tìm kiếm không tồn tại.</p>
      <router-link to="/" class="home-link">Quay về đăng nhập</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #b3e5fc);
  font-family: 'Arial', sans-serif;
}

.not-found-card {
  text-align: center;
  background: white;
  padding: 40px 60px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.05);
  animation: fadeIn 1s ease-in-out;
}

.not-found-card h1 {
  font-size: 100px;
  color: #0288d1;
  margin: 0;
}

.not-found-card p {
  font-size: 18px;
  color: #555;
  margin: 20px 0;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #0288d1;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #0277bd;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>