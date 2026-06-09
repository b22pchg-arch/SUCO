COMTRADE Offline Reader Pro V4 PWA - Phân tích sự cố
==================================

Thanh phan:
- index.html: ung dung doc/ve/chuyen doi COMTRADE offline.
- manifest.webmanifest: khai bao PWA.
- sw.js: Service Worker cache-first, co nut cap nhat cache thu cong.
- icons/: bieu tuong PWA.
- run_local_server_windows.cmd: chay nhanh localhost tren Windows.

Cach dung nhanh tren Windows:
1. Giai nen thu muc nay.
2. Bam dup run_local_server_windows.cmd.
3. Trinh duyet mo http://localhost:8765/.
4. Bam nut "Cai PWA" neu trinh duyet hien cho phep cai.
5. Bam "Cap nhat cache" de nap moi file vao cache offline.

Luu y quan trong:
- Mo truc tiep index.html bang file:// van doc duoc COMTRADE, nhung trinh duyet khong cho cai PWA/Service Worker.
- Muon cai PWA offline can mo qua localhost hoac HTTPS. Localhost duoc Chrome/Edge tinh la moi truong an toan.
- Sau khi da cache, ung dung co the mo lai khi mat mang, mien la trinh duyet/PWA chua bi xoa cache.
- Neu cap nhat code, thay file trong thu muc, mo lai localhost va bam "Cap nhat cache".

Phu hop SCADA offline:
- Khong dung CDN.
- Khong gui file ra ngoai.
- Toan bo CFG/DAT/CFF/LOG duoc xu ly cuc bo tren trinh duyet.


BỔ SUNG V4 - PHÂN TÍCH SỰ CỐ
- Tab "Phân tích sự cố" tự nhận dạng kênh dòng/áp theo tên kênh, pha và đơn vị trong CFG.
- Tính RMS trượt 1 chu kỳ để xác định dạng sự cố, pha sự cố, thời điểm bắt đầu/kết thúc, thời gian sự cố.
- Tự tìm mốc digital theo từ khóa Pickup/Start, Trip/Operate, 52A/52B/CB/Máy cắt/BREAKER.
- Cho phép đưa con trỏ A/B tới đầu/cuối sự cố, phóng khoảng sự cố và xuất báo cáo JSON/CSV.


=== BỔ SUNG V5 ===
- Thêm công cụ cập nhật PWA chủ động: Kiểm tra bản mới, Ép cập nhật phiên bản, Tải lại bỏ cache.
- Thêm chế độ xem: Tự động / Điện thoại / Máy tính. Chế độ được lưu trong localStorage.
- Thêm xuất kết quả phân tích sự cố sang HTML, mở trực tiếp báo cáo HTML, xuất TXT. File HTML có nút In / lưu PDF trong trình duyệt.
- Khi thay bản mới trong cùng thư mục localhost, hãy mở ứng dụng và bấm “Ép cập nhật phiên bản” để xóa cache cũ và nạp lại app shell.
