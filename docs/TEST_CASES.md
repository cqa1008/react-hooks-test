# Test Cases — React Hooks Project

## Q1: ValidatedInput

### A. Hàm `validateEmail` (kiểm tra đầu vào — #1-12)
> Chạy bằng Node script tạm (đã xóa sau khi test xong).
> **Fix:** `#2` phát hiện bug `!value` không bắt khoảng trắng → sửa thành `!value.trim()`.

| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 1 | `''` (rỗng) | Lỗi: không được để trống | ✅ PASS |
| 2 | `' '` (chỉ khoảng trắng) | Lỗi: không được để trống | ✅ PASS _(sau fix `!value.trim()`)_ |
| 3 | `abc` | Lỗi: không hợp lệ | ✅ PASS |
| 4 | `abc@` | Lỗi | ✅ PASS |
| 5 | `abc@a` | Lỗi | ✅ PASS |
| 6 | `abc@a.` | Lỗi | ✅ PASS |
| 7 | `abc@a.c` | Lỗi (đuôi miền chỉ 1 ký tự) | ✅ PASS |
| 8 | `@a.com` | Lỗi | ✅ PASS |
| 9 | `abc@@a.com` | Lỗi | ✅ PASS |
| 10 | `ab c@a.com` | Lỗi (có khoảng trắng) | ✅ PASS |
| 11 | `abc@a.com` | Hợp lệ | ✅ PASS |
| 12 | `abc.def+tag@sub.domain.co` | Hợp lệ | ✅ PASS |

### B. Hành vi giao diện (#13-18)
> Test trên http://localhost:5174 qua browser agent.

| # | Thao tác | Kỳ vọng | Kết quả |
|---|---|---|---|
| 13 | Mở trang với giá trị mặc định hợp lệ | Không có lỗi | ✅ PASS |
| 14 | Gõ ký tự khiến email sai | Viền đỏ và helperText hiện ngay, không cần blur | ✅ PASS |
| 15 | Sửa lại thành email đúng | Lỗi biến mất ngay | ✅ PASS |
| 16 | Xóa trống toàn bộ ô | Hiện lỗi "không được để trống" | ✅ PASS |
| 17 | Gõ nhanh liên tục nhiều ký tự | Lỗi luôn khớp giá trị mới nhất, không bị trễ một nhịp | ✅ PASS |
| 18 | Mở console khi dùng | Không có warning hay lỗi, không bị render vô hạn | ✅ PASS |

---

## Q2: Todo List

### A. Thêm (#19-26)
> Test trên http://localhost:5174 qua browser agent.

| # | Thao tác | Kỳ vọng | Kết quả |
|---|---|---|---|
| 19 | Gõ chữ rồi bấm ADD | Todo xuất hiện cuối danh sách, ô nhập được xóa | ✅ PASS |
| 20 | Gõ chữ rồi nhấn Enter | Giống trường hợp 19 | ✅ PASS |
| 21 | Ô rỗng | Nút ADD bị vô hiệu hóa, Enter không thêm gì | ✅ PASS |
| 22 | Chỉ nhập khoảng trắng | Không thêm | ✅ PASS |
| 23 | `  học hooks  ` (có spaces) | Thêm thành `học hooks` (đã trim) | ✅ PASS |
| 24 | Thêm hai todo cùng nội dung | Cả hai đều được thêm, thao tác sau không ảnh hưởng nhau | ✅ PASS |
| 25 | Thêm 10 todo | Đúng thứ tự thêm | ✅ PASS |
| 26 | Nhập chuỗi rất dài | Xuống dòng hợp lý, không vỡ bố cục | ✅ PASS |

### B. Sửa (#27-35)

| # | Thao tác | Kỳ vọng | Kết quả |
|---|---|---|---|
| 27 | Bấm Edit | Dòng đó chuyển thành ô nhập có sẵn nội dung cũ, kèm Save/Cancel | ✅ PASS |
| 28 | Đổi chữ rồi bấm Save | Nội dung cập nhật, thoát chế độ sửa, vị trí không đổi | ✅ PASS |
| 29 | Nhấn Enter khi đang sửa | Lưu | ✅ PASS |
| 30 | Nhấn Escape khi đang sửa | Hủy, giữ nguyên nội dung cũ | ✅ PASS |
| 31 | Bấm Cancel (icon X) | Giữ nguyên nội dung cũ | ✅ PASS |
| 32 | Xóa trống hoặc chỉ khoảng trắng rồi Save | Không lưu | ✅ PASS |
| 33 | Sửa thành `  abc  ` | Lưu thành `abc` (đã trim) | ✅ PASS |
| 34 | Đang sửa dòng A, bấm Edit dòng B | Chuyển sang sửa B, A giữ nguyên nội dung cũ | ✅ PASS |
| 35 | Đang sửa, bấm Delete dòng đó | Dòng bị xóa, không còn ô sửa nào treo lại | ✅ PASS |

### C. Xóa (#36-40)

| # | Thao tác | Kỳ vọng | Kết quả |
|---|---|---|---|
| 36 | Xóa todo đầu, giữa, cuối | Chỉ đúng dòng đó bị xóa, các dòng còn lại giữ thứ tự | ✅ PASS |
| 37 | Xóa một trong hai todo trùng nội dung | Chỉ xóa đúng dòng được bấm | ✅ PASS |
| 38 | Xóa todo cuối cùng | Hiện "Chưa có todo nào. Thêm mới bên trên!" | ✅ PASS |
| 39 | Thêm mới sau khi đã xóa hết | Hoạt động bình thường | ✅ PASS |
| 40 | Tải lại trang | Danh sách về rỗng (không yêu cầu lưu trữ) | ✅ PASS |

---

## Kiểm tra chung (#41-43)

| # | Lệnh / Thao tác | Kỳ vọng | Kết quả |
|---|---|---|---|
| 41 | `npm run build` | Thành công | ✅ PASS |
| 42 | `npm run lint` | Không có lỗi (cảnh báo setState-in-effect ở Q1 thì ghi chú, không tắt rule) | ✅ PASS _(1 warning được chấp nhận — xem ghi chú)_ |
| 43 | Console trình duyệt | Không có warning key, không có lỗi runtime | ✅ PASS |

---

## Ghi chú

### #42 — lint warning `set-state-in-effect` (Q1)
```
⚠ react(set-state-in-effect): Calling setState synchronously within an effect
  → setError(validate(value)) bên trong useEffect
```
**Lý do chấp nhận:** Đây là **yêu cầu bài tập** — bài Q1 yêu cầu dùng `useEffect` để validate.
Trong thực tế production, nên derive `error` trực tiếp trong render thay vì dùng `useEffect`.
Đã ghi chú trong code, không tắt rule.

### Fix trong lần test
| Bug | Nguyên nhân | Sửa |
|---|---|---|
| #2 FAIL: `' '` → sai message | `!value` không bắt string chỉ khoảng trắng | Đổi thành `!value.trim()` trong `validateEmail` |
