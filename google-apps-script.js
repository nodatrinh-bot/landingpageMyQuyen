/**
 * ============================================================================
 * GOOGLE APPS SCRIPT: TỰ ĐỘNG LƯU KHÁCH HÀNG VÀO GOOGLE SHEET & GỬI EMAIL GMAIL
 * Hệ Thống: Thử Thách 2 Ngày Affiliate Tự Động - Ngô Mỹ Quyên
 * ============================================================================
 * 
 * HƯỚNG DẪN 3 BƯỚC CÀI ĐẶT (MẤT 1 PHÚT):
 * 1. Mở file Google Sheet mới (gõ sheets.new trên trình duyệt).
 * 2. Bấm menu "Tiện ích mở rộng" (Extensions) -> chọn "Apps Script".
 * 3. Xóa hết mã cũ trong đó, dán toàn bộ đoạn mã bên dưới này vào.
 * 4. Bấm "Triển khai" (Deploy) ở góc trên bên phải -> chọn "Tùy chọn triển khai mới" (New deployment).
 *    - Chọn loại: "Ứng dụng web" (Web app).
 *    - Mô tả: "Affiliate My Quyen Form Webhook".
 *    - Người thực thi (Execute as): "Tôi" (Me).
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone).
 * 5. Bấm "Triển khai" -> "Ủy quyền truy cập" (Authorize access) -> Chọn tài khoản Google của bạn -> Bấm "Nâng cao" (Advanced) -> "Đi tới (không an toàn)" -> Bấm "Cho phép" (Allow).
 * 6. Copy đường link Web App URL (dạng: https://script.google.com/macros/s/.../exec) và dán vào file assets/js/main.js hoặc gửi cho trợ lý!
 * ============================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tự động tạo hàng tiêu đề nếu trang tính còn mới tinh
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Thời gian đăng ký", "Họ và tên", "Số điện thoại", "Email", "Trạng thái vé"]);
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#047857");
      headerRange.setFontColor("#ffffff");
      sheet.setRowHeight(1, 35);
      sheet.setColumnWidth(1, 170);
      sheet.setColumnWidth(2, 200);
      sheet.setColumnWidth(3, 140);
      sheet.setColumnWidth(4, 240);
      sheet.setColumnWidth(5, 150);
    }
    
    var data = e.parameter || {};
    // Nếu dữ liệu gửi dạng JSON raw
    if (!data.fullname && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {}
    }
    
    var fullname = (data.fullname || "Khách hàng").trim();
    var phone = (data.phone || "").trim();
    var email = (data.email || "").trim();
    var now = Utilities.formatDate(new Date(), "Asia/Ho_Chi_Minh", "dd/MM/yyyy HH:mm:ss");
    
    // 1. GHI THÔNG TIN VÀO GOOGLE SHEET
    sheet.appendRow([now, fullname, "'" + phone, email, "ĐÃ CẤP VÉ VIP"]);
    
    // 2. GỬI EMAIL XÁC NHẬN VÉ CHO KHÁCH HÀNG
    if (email && email.indexOf("@") > -1) {
      var subjectCustomer = "🎉 [VÉ VIP] Xác nhận tham gia Thử Thách 2 Ngày Affiliate Tự Động - Ngô Mỹ Quyên";
      var htmlCustomer = `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff;">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #065f46 0%, #047857 100%); color: #ffffff; padding: 28px 24px; text-align: center;">
            <span style="background: rgba(255,255,255,0.2); padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">XÁC NHẬN GIỮ CHỖ THÀNH CÔNG</span>
            <h1 style="margin: 12px 0 6px; font-size: 22px; line-height: 1.3;">THỬ THÁCH 2 NGÀY: TẠO DÒNG TIỀN 30 TRIỆU/THÁNG TỪ AFFILIATE</h1>
            <p style="margin: 0; font-size: 15px; color: #a7f3d0;">Chuyên gia Đào tạo & Cố vấn Dòng tiền: Ngô Mỹ Quyên</p>
          </div>

          <!-- Body Content -->
          <div style="padding: 28px 24px; color: #334155; line-height: 1.6;">
            <p style="font-size: 16px;">Xin chào <strong>${fullname}</strong>,</p>
            <p style="font-size: 15px;">
              Chúc mừng bạn đã xuất sắc đăng ký giữ chỗ thành công <strong>Vé VIP tham dự Thử Thách 2 Ngày</strong> và nhận trọn gói quà tặng kích hoạt trị giá <strong>125.970.000 VNĐ</strong>!
            </p>

            <!-- VIP Ticket Box -->
            <div style="background: #f0fdf4; border: 2px dashed #10b981; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <h3 style="margin: 0 0 12px; color: #047857; font-size: 17px; text-transform: uppercase;">🎫 THÔNG TIN VÉ THAM DỰ CỦA BẠN:</h3>
              <p style="margin: 6px 0; font-size: 14px;">👤 <strong>Họ và tên:</strong> ${fullname}</p>
              <p style="margin: 6px 0; font-size: 14px;">📞 <strong>Số điện thoại:</strong> ${phone}</p>
              <p style="margin: 6px 0; font-size: 14px;">📧 <strong>Email nhận vé:</strong> ${email}</p>
              <p style="margin: 6px 0; font-size: 14px;">🎟️ <strong>Hạng vé:</strong> VÉ VIP CHÍNH THỨC (Miễn phí 100%)</p>
              <p style="margin: 6px 0; font-size: 14px;">💻 <strong>Hình thức học:</strong> Trực tiếp qua Zoom cùng Chuyên gia Ngô Mỹ Quyên</p>
            </div>

            <!-- Urgent Call to Action -->
            <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 14px 18px; border-radius: 4px; margin-bottom: 24px;">
              <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: bold;">
                ⚠️ QUAN TRỌNG: ĐƯỜNG LINK ZOOM VÀ TÀI LIỆU SẼ ĐƯỢC GỬI TRONG NHÓM ZALO
              </p>
              <p style="margin: 6px 0 0; color: #7f1d1d; font-size: 13px;">
                Để tránh thất lạc link phòng Zoom và nhận ngay bộ quà tặng trước buổi học, bạn hãy bấm vào nút bên dưới để tham gia nhóm Zalo VIP ngay lúc này:
              </p>
            </div>

            <!-- Big Zalo Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://zalo.me/g/urqmrurj94o3y9yazfsc" style="background: #0068ff; color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 6px 18px rgba(0, 104, 255, 0.35);">
                💬 BẤM VÀO ĐÂY ĐỂ VÀO NHÓM ZALO NHẬN LINK ZOOM NGAY
              </a>
            </div>

            <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
              Nếu bạn có bất kỳ vướng mắc nào, hãy liên hệ trực tiếp với Ban tổ chức qua nhóm Zalo hoặc phản hồi lại email này.
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 20px;">
            <p style="margin: 0; font-size: 13px; color: #94a3b8; text-align: center;">
              Thử Thách 2 Ngày Affiliate Tự Động • Chuyên gia Ngô Mỹ Quyên<br>
              Website: <a href="https://ngomyquyen.vercel.app" style="color: #047857; text-decoration: none;">ngomyquyen.vercel.app</a>
            </p>
          </div>
        </div>
      `;
      GmailApp.sendEmail(email, subjectCustomer, "", { htmlBody: htmlCustomer });
    }
    
    // 3. GỬI THÔNG BÁO TỨC THÌ ĐẾN GMAIL CỦA BẠN (CHỦ SỞ HỮU)
    var ownerEmail = Session.getActiveUser().getEmail();
    if (ownerEmail) {
      var subjectOwner = "🔥 [KHÁCH HÀNG MỚI] " + fullname + " (" + phone + ") vừa đăng ký Thử Thách!";
      var htmlOwner = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #047857; margin-top: 0;">🎉 BẠN VỪA CÓ 1 KHÁCH HÀNG MỚI ĐĂNG KÝ:</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 14px;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; width: 140px;"><strong>Họ và tên:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${fullname}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Số điện thoại:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}" style="color: #0068ff; font-weight: bold; font-size: 16px;">${phone}</a> (Bấm để gọi ngay)</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Email khách:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Thời gian:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${now}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 14px; color: #64748b;">
            👉 Dữ liệu này đã được lưu tự động vào Google Sheet của bạn. Hệ thống cũng đã tự động gửi email xác nhận và link Zalo cho khách hàng.
          </p>
        </div>
      `;
      GmailApp.sendEmail(ownerEmail, subjectOwner, "", { htmlBody: htmlOwner });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
