# Hướng Dẫn Sử Dụng Landing Page "Thử Thách 2 Ngày Affiliate 30 Triệu/Tháng"
> Được phát triển chuyên nghiệp cho **Ngô Mỹ Quyên**, tối ưu tốc độ tải trang, trải nghiệm di động và tỷ lệ chuyển đổi (CRO).

---

## 📁 Cấu Trúc Thư Mục

```text
Trinh Canary/
├── index.html            # Trang Landing Page chính (đầy đủ 15 phần, chuẩn Direct Response)
├── thank-you.html        # Trang cảm ơn sau khi khách hàng điền form đăng ký
├── README.md             # Hướng dẫn chi tiết sử dụng và tùy biến
└── assets/
    ├── css/
    │   └── style.css     # Toàn bộ mã định kiểu CSS (Fonts Oswald, Montserrat, màu sắc, responsive)
    ├── js/
    │   └── main.js       # Đồng hồ đếm ngược, popup đăng ký, thông báo xã hội (toast), xử lý form
    └── images/           # Toàn bộ ảnh tài nguyên chất lượng cao lưu cục bộ (mockup 3D, chân dung Ngô Mỹ Quyên, quà tặng...)
```

---

## 🌟 Các Tính Năng Đột Phá

1. **Tốc độ siêu nhanh**:
   - Trang gốc trên GoHighLevel tải hơn 1.2 MB mã script cồng kềnh. Trang này được viết bằng HTML5/CSS3/JS thuần chuẩn, tải hoàn tất trong chưa đầy 0.3s.
2. **Hình ảnh cục bộ 100%**:
   - Toàn bộ 27 hình ảnh, mockup quà tặng 3D, chân dung diễn giả và huy hiệu đã được tải về thư mục `assets/images/`, không lo ảnh bị lỗi hay die link từ CDN nước ngoài.
3. **Bộ đếm ngược khẩn cấp (Countdown Timer)**:
   - Đếm ngược liên tục 15 phút trên thanh thông báo đầu trang để kích hoạt tâm lý khan hiếm (Scarcity).
4. **Popup thu thập thông tin (Opt-in Lead Modal)**:
   - Tự động mở khi khách bấm bất kỳ nút kêu gọi hành động (CTA) nào trên trang hoặc khi người dùng di chuột chuẩn bị rời khỏi trang (Exit Intent Popup).
   - Thu thập: **Họ và tên**, **Số điện thoại (Zalo)**, **Địa chỉ Email**.
5. **Thanh đăng ký cố định trên điện thoại (Sticky Bottom Bar)**:
   - Hiển thị liên tục ở đáy màn hình khi cuộn trang, giúp khách hàng bấm giữ chỗ ngay bất cứ lúc nào.
6. **Thông báo đơn hàng ảo thời gian thực (Social Proof Toasts)**:
   - Góc dưới bên trái xuất hiện thông báo: *"Nguyễn Văn Tuấn (Hà Nội) vừa đăng ký thành công..."* giúp gia tăng niềm tin tuyệt đối cho khách mới.
7. **Trang Cảm Ơn Chuyên Nghiệp (`thank-you.html`)**:
   - Điều hướng khách hàng vào nhóm Zalo để nhận link Zoom và tài liệu học.

---

## ⚙️ Hướng Dẫn Tùy Biến Nhanh

### 1. Link nhóm Zalo:
Đã được cấu hình trực tiếp sang nhóm của bạn:
```html
<a href="https://zalo.me/g/urqmrurj94o3y9yazfsc" target="_blank" class="btn-zalo pulse-animation">
  💬 BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO NGAY
</a>
```

### 2. Xem danh sách khách hàng đã đăng ký:
Khi người dùng bấm gửi form trên trang, dữ liệu sẽ tự động được lưu vào trình duyệt (`localStorage`).
Bạn có thể mở Console (F12 trên trình duyệt) gõ:
```javascript
console.table(JSON.parse(localStorage.getItem('registered_leads')));
```

### 3. Đấu nối gửi dữ liệu về Google Sheets / Webhook CRM:
Trong file `assets/js/main.js`, tìm hàm `initFormSubmission()`:
Bạn có thể thêm lệnh gửi dữ liệu về Google Sheets hoặc webhook Make/Zapier/LadiFlow:
```javascript
fetch('https://hook.eu1.make.com/YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(lead)
});
```

---

## 🚀 Hướng Dẫn Triển Khai (Deploy Lên Mạng)

Bạn có thể đưa landing page này lên hoạt động miễn phí với tên miền riêng thông qua:
1. **Cloudflare Pages / Vercel / Netlify**: Kéo thả toàn bộ thư mục `Trinh Canary` lên là trang chạy ngay lập tức với HTTPS miễn phí.
2. **Hosting / cPanel / DirectAdmin**: Nén các file thành file `.zip` và tải lên thư mục `public_html`.
3. **GitHub Pages**: Tạo repository và bật GitHub Pages.
