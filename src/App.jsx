import { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Divider,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import ValidatedInput from './components/ValidatedInput/ValidatedInput';
import TodoList from './components/TodoList/TodoList';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePhoneVN,
  validateAge,
  validateUrl,
  validateFullName,
} from './utils/validators';

/**
 * Giả lập kiểm tra username bất đồng bộ trên server (API call).
 * Nếu các rule sync cơ bản đã lỗi thì trả về ngay;
 * nếu hợp lệ, delay 600ms giả lập mạng và kiểm tra danh sách tài khoản đã tồn tại.
 */
const validateUsernameAsync = (value) => {
  const syncError = validateUsername(value);
  if (syncError) return syncError;

  return new Promise((resolve) => {
    setTimeout(() => {
      const taken = ['admin', 'root', 'test'];
      if (taken.includes(value.toLowerCase().trim())) {
        resolve(`Tài khoản "${value}" đã có người sử dụng`);
      } else {
        resolve('');
      }
    }, 600);
  });
};

function App() {
  // State lưu giá trị password của ô Password để dùng so sánh trong Confirm Password
  const [password, setPassword] = useState('');

  /**
   * validateConfirmPassword — sử dụng useCallback với dependency [password].
   *
   * TẠI SAO PHẢI DÙNG useCallback VÀ DEPENDENCY [password]?
   * - Nếu không có useCallback, mỗi khi App re-render sẽ sinh hàm mới làm effect trong
   *   ValidatedInput chạy lại không cần thiết.
   * - Nếu để dependency rỗng [], hàm validate sẽ bị "stale closure" — luôn so sánh với giá trị
   *   password ban đầu ('') ngay cả khi người dùng đã đổi password.
   * - Khi đưa [password] vào dependency array: mỗi khi password thay đổi, React sẽ tạo phiên bản
   *   validateConfirmPassword mới. Nhờ đó, useEffect([value, validate]) trong ValidatedInput
   *   nhận diện validate đã thay đổi và re-validate lại Confirm Password ngay lập tức!
   */
  const validateConfirmPassword = useCallback(
    (value) => {
      if (!value) return 'Vui lòng xác nhận mật khẩu';
      if (value !== password) return 'Mật khẩu xác nhận không khớp';
      return '';
    },
    [password]
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Section Q1: Form Validation với useEffect */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Q1: Form Input Validation với useEffect()
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Trình diễn 8 kịch bản validate bằng <code>useEffect</code>, quản lý dependency array,
          debounce, async validation và show/hide password:
        </Typography>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Stack spacing={2.5}>
            {/* 1. Email */}
            <ValidatedInput
              validate={validateEmail}
              label="1. Email"
              placeholder="nhap.email@example.com"
            />

            {/* 2. Password */}
            <ValidatedInput
              type="password"
              validate={validatePassword}
              label="2. Mật khẩu"
              placeholder="Tối thiểu 8 ký tự, có hoa, thường, số, ký tự đặc biệt"
              onChange={setPassword}
            />

            {/* 3. Confirm Password (phụ thuộc state password qua useCallback) */}
            <ValidatedInput
              type="password"
              validate={validateConfirmPassword}
              label="3. Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu giống bên trên"
            />

            {/* 4. Username (async check + debounce 500ms) */}
            <ValidatedInput
              validate={validateUsernameAsync}
              label="4. Tên đăng nhập (Async check + Debounce)"
              placeholder="Thử nhập: admin, root, test để xem báo trùng"
              debounceMs={500}
            />

            {/* 5. Số điện thoại VN */}
            <ValidatedInput
              validate={validatePhoneVN}
              label="5. Số điện thoại VN"
              placeholder="VD: 0912345678 hoặc +84912345678"
            />

            {/* 6. Tuổi */}
            <ValidatedInput
              type="number"
              validate={validateAge}
              label="6. Tuổi"
              placeholder="Số nguyên từ 1 đến 150"
            />

            {/* 7. Website URL */}
            <ValidatedInput
              validate={validateUrl}
              label="7. Website / URL"
              placeholder="https://example.com"
            />

            {/* 8. Họ và tên */}
            <ValidatedInput
              validate={validateFullName}
              label="8. Họ và tên"
              placeholder="VD: Nguyễn Văn A (tối thiểu 2 từ)"
            />
          </Stack>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section Q2: Todo List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Q2: Todo List
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Quản lý danh sách todo với useState (functional update), sửa inline (Enter: Lưu, Escape: Hủy), xóa.
        </Typography>
        <TodoList />
      </Box>
    </Container>
  );
}

export default App;
