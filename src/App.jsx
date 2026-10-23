import { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Stack,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';

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
  // Theme tùy biến hiện đại, tinh gọn với MUI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#4f46e5', // Indigo hiện đại
            light: '#6366f1',
            dark: '#4338ca',
          },
          secondary: {
            main: '#0ea5e9', // Sky blue
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#0f172a',
            secondary: '#64748b',
          },
          divider: '#e2e8f0',
        },
        typography: {
          fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
          },
          h6: {
            fontWeight: 700,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: '#334155', // Xám đậm hơn một bậc để tăng độ tương phản
                fontWeight: 500,
                '&.Mui-focused': {
                  color: '#4f46e5',
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                '& input::placeholder': {
                  color: '#475569', // Xám đậm hơn cho placeholder
                  opacity: 0.85,
                },
                // Đổi viền focus của mọi TextField sang primary color
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4f46e5',
                  borderWidth: '2px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4f46e5',
                },
              },
            },
          },
        },
      }),
    []
  );

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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: 8 }}>
        {/* Section Q1: Form Validation với useEffect */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2.5,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5 }}>
                <VerifiedUserOutlinedIcon color="primary" sx={{ fontSize: 30 }} />
                <Typography variant="h5" component="h1" sx={{ fontWeight: 800 }}>
                  Q1: Form Input Validation với useEffect()
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                8 kịch bản validate độc lập tự viết bằng <code>useEffect</code>, hỗ trợ Debounce, Async check và Password toggle:
              </Typography>
            </Box>

            <Chip
              icon={<LayersOutlinedIcon />}
              label="8 Trường dữ liệu"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
          </Box>

          {/* Form bố cục 2 cột gọn gàng: responsive dưới 900px tự động xếp thành 1 cột */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 3, md: 4 },
              }}
            >
              {/* Cột 1: Thông tin tài khoản & bảo mật */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'primary.main',
                    mb: 2,
                    pb: 1,
                    borderBottom: '2px solid',
                    borderColor: 'primary.main',
                    display: 'inline-block',
                  }}
                >
                  Nhóm 1: Tài khoản & Xác thực
                </Typography>

                <Stack spacing={2.5}>
                  {/* 1. Email */}
                  <ValidatedInput
                    validate={validateEmail}
                    label="1. Địa chỉ Email"
                    placeholder="nhap.email@example.com"
                    startIcon={<EmailOutlinedIcon fontSize="small" />}
                  />

                  {/* 2. Password */}
                  <ValidatedInput
                    type="password"
                    validate={validatePassword}
                    label="2. Mật khẩu"
                    placeholder="≥ 8 ký tự, gồm chữ hoa, thường và số"
                    onChange={setPassword}
                    startIcon={<LockOutlinedIcon fontSize="small" />}
                  />

                  {/* 3. Confirm Password (phụ thuộc state password qua useCallback) */}
                  <ValidatedInput
                    type="password"
                    validate={validateConfirmPassword}
                    label="3. Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu giống bên trên"
                    startIcon={<VpnKeyOutlinedIcon fontSize="small" />}
                  />

                  {/* 4. Username (async check + debounce 500ms) */}
                  <ValidatedInput
                    validate={validateUsernameAsync}
                    label="4. Tên đăng nhập (Async + Debounce 500ms)"
                    placeholder="Thử gõ: admin, root, test để thấy báo trùng"
                    debounceMs={500}
                    startIcon={<AccountCircleOutlinedIcon fontSize="small" />}
                  />
                </Stack>
              </Box>

              {/* Cột 2: Thông tin cá nhân & liên hệ */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'primary.main',
                    mb: 2,
                    pb: 1,
                    borderBottom: '2px solid',
                    borderColor: 'primary.main',
                    display: 'inline-block',
                  }}
                >
                  Nhóm 2: Thông tin bổ sung
                </Typography>

                <Stack spacing={2.5}>
                  {/* 5. Số điện thoại VN */}
                  <ValidatedInput
                    validate={validatePhoneVN}
                    label="5. Số điện thoại VN"
                    placeholder="VD: 0912345678 hoặc +84912345678"
                    startIcon={<PhoneOutlinedIcon fontSize="small" />}
                  />

                  {/* 6. Tuổi */}
                  <ValidatedInput
                    type="number"
                    validate={validateAge}
                    label="6. Tuổi"
                    placeholder="Số nguyên từ 18 đến 100"
                    startIcon={<CakeOutlinedIcon fontSize="small" />}
                  />

                  {/* 7. Website URL */}
                  <ValidatedInput
                    validate={validateUrl}
                    label="7. Website / Portfolio URL"
                    placeholder="https://example.com"
                    startIcon={<LanguageOutlinedIcon fontSize="small" />}
                  />

                  {/* 8. Họ và tên */}
                  <ValidatedInput
                    validate={validateFullName}
                    label="8. Họ và tên đầy đủ"
                    placeholder="VD: Nguyễn Văn An (tối thiểu 2 từ)"
                    startIcon={<BadgeOutlinedIcon fontSize="small" />}
                  />
                </Stack>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 6, borderColor: 'divider' }} />

        {/* Section Q2: Todo List */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 800, mb: 0.5 }}>
              Q2: Todo List Task Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quản lý danh sách công việc thuần bằng <code>useState</code> với functional updates,
              sửa trực tiếp inline (Enter: Lưu, Escape: Hủy) và xóa nhanh chóng.
            </Typography>
          </Box>

          <TodoList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
