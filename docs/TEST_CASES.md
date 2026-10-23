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

## Q1 Mở rộng: Bộ Validator (`src/utils/validators.js` — #44-88)
> Chạy bằng Node script tạm (đã kiểm tra và xóa sau khi hoàn tất).

### A. `validatePassword` (#44-50)
| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 44 | `''` (rỗng) | Lỗi: Mật khẩu không được để trống | ✅ PASS |
| 45 | `'Aa1'` (< 8 ký tự) | Lỗi: Mật khẩu tối thiểu 8 ký tự | ✅ PASS |
| 46 | `'abcdef12'` (thiếu chữ hoa) | Lỗi: Mật khẩu cần ít nhất 1 chữ hoa | ✅ PASS |
| 47 | `'ABCDEF12'` (thiếu chữ thường) | Lỗi: Mật khẩu cần ít nhất 1 chữ thường | ✅ PASS |
| 48 | `'Abcdefgh'` (thiếu số) | Lỗi: Mật khẩu cần ít nhất 1 chữ số | ✅ PASS |
| 49 | `'Abcdef12'` (hoa + thường + số, không cần ký tự đặc biệt) | Hợp lệ | ✅ PASS |
| 50 | `'StrongPass1'` (đủ điều kiện) | Hợp lệ | ✅ PASS |

### B. `validateUsername` (#51-58)
| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 51 | `''` (rỗng) | Lỗi: Username không được để trống | ✅ PASS |
| 52 | `'   '` (chỉ khoảng trắng) | Lỗi: Username không được để trống | ✅ PASS |
| 53 | `'ab'` (< 3 ký tự) | Lỗi: Username tối thiểu 3 ký tự | ✅ PASS |
| 54 | 21 ký tự (`'a'*21`) | Lỗi: Username tối đa 20 ký tự | ✅ PASS |
| 55 | `'user@name'` (ký tự đặc biệt) | Lỗi: Username chỉ dùng chữ, số, gạch dưới | ✅ PASS |
| 56 | `'abc'` (biên 3 ký tự) | Hợp lệ | ✅ PASS |
| 57 | 20 ký tự (`'a'*20` — biên 20) | Hợp lệ | ✅ PASS |
| 58 | `'john_doe_99'` (chữ, số, gạch dưới) | Hợp lệ | ✅ PASS |

### C. `validatePhoneVN` (#59-68)
| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 59 | `''` (rỗng) | Lỗi: Số điện thoại không được để trống | ✅ PASS |
| 60 | `'   '` (khoảng trắng) | Lỗi: Số điện thoại không được để trống | ✅ PASS |
| 61 | `'0212345678'` (đầu 02 máy bàn) | Lỗi: Số điện thoại VN không hợp lệ | ✅ PASS |
| 62 | `'091234567'` (9 chữ số) | Lỗi: Số điện thoại VN không hợp lệ | ✅ PASS |
| 63 | `'09123456789'` (11 chữ số) | Lỗi: Số điện thoại VN không hợp lệ | ✅ PASS |
| 64 | `'091234567a'` (chứa chữ) | Lỗi: Số điện thoại VN không hợp lệ | ✅ PASS |
| 65 | `'0912345678'` (hợp lệ đầu 09) | Hợp lệ | ✅ PASS |
| 66 | `'0381234567'` (hợp lệ đầu 03) | Hợp lệ | ✅ PASS |
| 67 | `'+84912345678'` (định dạng quốc tế +84) | Hợp lệ | ✅ PASS |
| 68 | `'0912 345 678'` (có khoảng trắng phân cách) | Hợp lệ (đã clean) | ✅ PASS |

### D. `validateAge` (#69-77)
| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 69 | `''` (rỗng) | Lỗi: Tuổi không được để trống | ✅ PASS |
| 70 | `'abc'` (không phải số) | Lỗi: Tuổi phải là số nguyên | ✅ PASS |
| 71 | `'25.5'` (số thập phân) | Lỗi: Tuổi phải là số nguyên | ✅ PASS |
| 72 | `'17'` (< 18) | Lỗi: Tuổi phải từ 18 đến 100 | ✅ PASS |
| 73 | `'-5'` (số âm) | Lỗi: Tuổi phải từ 18 đến 100 | ✅ PASS |
| 74 | `'101'` (> 100) | Lỗi: Tuổi phải từ 18 đến 100 | ✅ PASS |
| 75 | `'18'` (biên dưới 18) | Hợp lệ | ✅ PASS |
| 76 | `'100'` (biên trên 100) | Hợp lệ | ✅ PASS |
| 77 | `'25'` (trong khoảng hợp lệ) | Hợp lệ | ✅ PASS |

### E. `validateUrl` (#78-83)
| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 78 | `''` (rỗng) | Lỗi: Website không được để trống | ✅ PASS |
| 79 | `'example.com'` (thiếu protocol) | Lỗi: Website không hợp lệ | ✅ PASS |
| 80 | `'ftp://example.com'` (giao thức không được hỗ trợ) | Lỗi: Website phải bắt đầu bằng http:// hoặc https:// | ✅ PASS |
| 81 | `'http://'` (sai cú pháp) | Lỗi: Website không hợp lệ | ✅ PASS |
| 82 | `'http://example.com'` (hợp lệ http) | Hợp lệ | ✅ PASS |
| 83 | `'https://sub.domain.vn/path?id=123#sec'` | Hợp lệ | ✅ PASS |

### F. `validateFullName` (#84-88)
| # | Input | Kỳ vọng | Kết quả |
|---|---|---|---|
| 84 | `''` (rỗng) | Lỗi: Họ tên không được để trống | ✅ PASS |
| 85 | `'Nguyen'` (1 từ) | Lỗi: Họ tên cần ít nhất 2 từ | ✅ PASS |
| 86 | `'A Nguyen'` (có từ < 2 ký tự) | Lỗi: Mỗi từ trong họ tên cần ít nhất 2 ký tự | ✅ PASS |
| 87 | `'Le An'` (2 từ hợp lệ) | Hợp lệ | ✅ PASS |
| 88 | `'  Nguyen   Van  An  '` (3 từ, nhiều spaces) | Hợp lệ (đã clean) | ✅ PASS |

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

