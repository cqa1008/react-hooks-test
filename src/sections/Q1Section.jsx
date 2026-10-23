import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
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

import ValidatedInput from '../components/ValidatedInput/ValidatedInput';
import FormGroupTitle from '../components/FormGroupTitle/FormGroupTitle';
import {
  validateEmail,
  validatePassword,
  validateUsernameAsync,
  validatePhoneVN,
  validateAge,
  validateUrl,
  validateFullName,
} from '../utils/validators';

/**
 * Q1Section — Khu vực demo Q1: Form Input Validation với useEffect()
 * Quản lý state password và validateConfirmPassword với useCallback([password])
 */
export default function Q1Section() {
  // State lưu giá trị password của ô Password để dùng so sánh trong Confirm Password
  const [password, setPassword] = useState('');

  /**
   * validateConfirmPassword — sử dụng useCallback với dependency [password].
   *
   * TẠI SAO PHẢI DÙNG useCallback VÀ DEPENDENCY [password]?
   * - Nếu không có useCallback, mỗi khi component re-render sẽ sinh hàm mới làm effect trong
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
            <FormGroupTitle>Nhóm 1: Tài khoản & Xác thực</FormGroupTitle>

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
            <FormGroupTitle>Nhóm 2: Thông tin bổ sung</FormGroupTitle>

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
  );
}
