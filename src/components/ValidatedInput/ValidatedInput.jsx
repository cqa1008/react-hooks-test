import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

/**
 * ValidatedInput — Q1: Form Input Validation với useEffect
 *
 * Props:
 *   - validate: (value: string) => string  — trả về chuỗi lỗi hoặc ""
 *   - label: string
 *   - placeholder: string
 *   - initialValue: string
 *
 * Quan trọng: prop `validate` phải có tham chiếu ổn định (định nghĩa ngoài
 * component cha hoặc bọc bằng useCallback), nếu không mỗi render của cha sẽ
 * tạo ra một hàm mới → useEffect chạy lại vô tận.
 */
export default function ValidatedInput({
  validate,
  label = 'Input',
  placeholder = '',
  initialValue = '',
}) {
  // value: giá trị người dùng đang gõ
  const [value, setValue] = useState(initialValue);

  // error: kết quả validate, chuỗi rỗng = hợp lệ
  const [error, setError] = useState('');

  // touched: true sau khi người dùng gõ lần đầu
  // → tránh hiện lỗi ngay khi component mới mount
  const [touched, setTouched] = useState(false);

  // useEffect chạy mỗi khi value hoặc validate thay đổi,
  // mô phỏng componentDidUpdate cho việc validate.
  //
  // Dependency array [value, validate]:
  //   - value  : cần re-validate mỗi khi giá trị thay đổi
  //   - validate: nằm trong array để đảm bảo đầy đủ deps theo rules;
  //               nếu `validate` không ổn định (tạo mới mỗi render) sẽ
  //               gây vòng lặp → cha phải đảm bảo tham chiếu ổn định.
  useEffect(() => {
    setError(validate(value));
  }, [value, validate]);

  const handleChange = (e) => {
    if (!touched) setTouched(true); // đánh dấu đã tương tác
    setValue(e.target.value);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      // Chỉ hiện trạng thái lỗi sau khi người dùng đã gõ
      error={touched && Boolean(error)}
      helperText={touched ? (error || ' ') : ' '}
      fullWidth
      variant="outlined"
    />
  );
}
