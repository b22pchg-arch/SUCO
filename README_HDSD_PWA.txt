COMTRADE Offline Reader Pro V9.9.29 - Record Decoder Plus

COMTRADE Offline Reader Pro V9.9.27
Bản sửa: khôi phục bảng Giá trị các phần tử sự cố theo đúng dạng sự cố trong giao diện và báo cáo HTML.

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


=== GHI CHÚ V9.9.19 ===
- Đọc thêm Fault/Event CSV và ROA trong cùng ZIP/thư mục với CFG/DAT.
- Tự nhận mã UTF-16LE/UTF-16BE/UTF-8 để đọc CSV Toshiba/SEL/IED.
- Ghép Fault Phase, Trip Phase, Fault Locator và Event CSV vào dòng thời gian phân tích.
- Lọc raw 99999 và raw ngoài min/max CFG để tránh RMS/biểu đồ sai.
- Xếp hạng kênh L/R1/R2/Id theo biến động sự cố để tránh chỉ dùng nhầm Ia/Ib/Ic đầu tiên.


V9.9.27: Sửa đọc RAR để lấy cả Fault/Event CSV và ROA trong RAR, gắn cùng nguồn RAR để ghép với CFG/DAT như ZIP/thư mục.


V9.9.27: bổ sung hồ sơ rơ le/loại bản ghi, thư viện nhận dạng chức năng bảo vệ 50/51/67/21/87L/87T/87B/81/27/59/50BF/79, cảnh báo thiếu dữ liệu và xuất profile JSON.


V9.9.27: sửa lỗi mở HTML do patch V9.9.25/V9.9.26 bị chèn nhầm vào template báo cáo; giữ RAR CSV/ROA và Hồ sơ rơ le.


V9.9.29: Core Consolidation & UniversalFaultRecord - ổn định kiến trúc, dữ liệu trung gian, mapping kênh thủ công, guard kiểm tra render/template.
