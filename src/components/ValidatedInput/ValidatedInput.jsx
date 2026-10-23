import { useState, useEffect } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * ValidatedInput — Q1 mở rộng
 *
 * Props:
 *   - validate    : (value) => string | Promise<string>  — hàm validate sync hoặc async
 *   - label       : string
 *   - type        : string  — 'text' | 'password' | 'number' | ...
 *   - placeholder : string
 *   - initialValue: string
 *   - onChange    : (value: string) => void  — callback tùy chọn (vd: để App theo dõi password)
 *   - debounceMs  : number  — trễ validate (ms), 0 = ngay lập tức
 *
 * Lưu ý tham chiếu ổn định:
 *   - validate thuần → định nghĩa ngoài component (module level)
 *   - validate phụ thuộc state → dùng useCallback ở component cha
 */
export default function ValidatedInput({
  validate,
  label = 'Input',
  type = 'text',
  placeholder = '',
  initialValue = '',
  onChange,
  debounceMs = 0,
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(false);

  // useEffect validate — chạy mỗi khi value, validate hoặc debounceMs thay đổi.
  //
  // Dependency array [value, validate, debounceMs]:
  //   - value: giá trị input cần validate mỗi khi người dùng nhập
  //   - validate: hàm kiểm tra (sync hoặc async trả về Promise); có thể cập nhật
  //               khi state cha đổi (vd: useCallback([password]))
  //   - debounceMs: độ trễ debounce tùy chọn
  //
  // Cơ chế hoạt động & Cleanup:
  //   - Flag `cancelled`: chống race condition cho async validate (nếu Promise cũ về sau
  //     Promise mới, kết quả cũ sẽ bị hủy).
  //   - Nếu có debounceMs > 0: dùng setTimeout hoãn chạy validate, clearTimeout khi value đổi liên tiếp.
  useEffect(() => {
    let cancelled = false;

    const executeValidation = () => {
      const result = validate(value);

      if (result instanceof Promise) {
        setChecking(true);
        result.then((err) => {
          if (!cancelled) {
            setError(err || '');
            setChecking(false);
          }
        });
      } else {
        setChecking(false);
        setError(result || '');
      }
    };

    if (debounceMs > 0) {
      const timer = setTimeout(executeValidation, debounceMs);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    executeValidation();
    return () => {
      cancelled = true;
    };
  }, [value, validate, debounceMs]);

  const handleChange = (e) => {
    if (!touched) setTouched(true);
    setValue(e.target.value);
    onChange?.(e.target.value); // optional: cha theo dõi giá trị (vd: password → confirm)
  };

  // endAdornment: nút show/hide cho password, hoặc spinner cho async checking
  const endAdornment = (() => {
    if (type === 'password') {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword((prev) => !prev)}
            edge="end"
            size="small"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </IconButton>
        </InputAdornment>
      );
    }
    if (checking) {
      return (
        <InputAdornment position="end">
          <CircularProgress size={18} />
        </InputAdornment>
      );
    }
    return null;
  })();

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
      error={touched && Boolean(error)}
      helperText={touched ? (error || ' ') : ' '}
      fullWidth
      variant="outlined"
      slotProps={{
        input: { endAdornment },
      }}
    />
  );
}
