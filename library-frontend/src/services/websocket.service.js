// services/WebSocketService.js

class WebSocketService {
  constructor(url) {
    this.url = url; // URL của WebSocket server
    this.ws = null; // Biến chứa kết nối WebSocket
    this.listeners = [];; // Mảng chứa các callback xử lý tin nhắn
  }

  // Kết nối đến WebSocket server
  connect() {
    if (this.ws) {
      console.warn('WebSocket is already connected.');
      return;
    }

    this.ws = new WebSocket(this.url);

    // Khi kết nối WebSocket thành công
    this.ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Khi nhận được tin nhắn từ server
    this.ws.onmessage = async (event) => {
      try{
          if (event.data instanceof Blob) {  
              // 🛠 Chuyển Blob thành text trước khi parse JSON
              const text = await event.data.text();
              try {
                  const message = JSON.parse(text);  // Chuyển thành JSON
                  console.log("📥 Nhận dữ liệu:", message);
              } catch (error) {
                  console.error("❌ JSON.parse lỗi:", error);
              }
          } else {
              // Nếu không phải Blob, xử lý như bình thường
              try {
                  const message = JSON.parse(event.data);
                  console.log("📥 Nhận dữ liệu:", message);
              } catch (error) {
                  console.error("❌ JSON.parse lỗi:", error);
              }
          }
        }catch(error){
          console.error("❌ Lỗi khi parse JSON:", error);
        }
      };


    // Khi WebSocket bị đóng
    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Khi có lỗi xảy ra
    this.ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
  }

  // Gửi tin nhắn đến WebSocket server
  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify( message)); // ✅ JSON hợp lệ
      console.log('Sent message: ', message);
    } else {
      console.error('WebSocket is not open');
    }
  }

  // Đăng ký các callback để xử lý các tin nhắn từ server
  onMessage(callback) {
    if (this.ws) {
      this.ws.onmessage = (event) => {
        callback(event.data); // Gọi callback khi có tin nhắn
      };
    } else {
      console.error('WebSocket is not connected');
    }
  }

  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);  // Thêm listener vào mảng
    } else {
      console.error('Listener must be a function');
    }
  }

  // Đóng kết nối WebSocket
  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default WebSocketService;
