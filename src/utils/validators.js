// src/utils/validators.js
// Tất cả hàm là thuần (pure function), không có side effect,
// tham chiếu ổn định khi import — an toàn để truyền thẳng vào dependency array.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validate email */
export const validateEmail = (value) => {
  if (!value.trim()) return 'Email không được để trống';
  if (!EMAIL_REGEX.test(value)) return 'Email không hợp lệ';
  return '';
};

/** Validate mật khẩu: ≥8 ký tự, có hoa + thường + số + ký tự đặc biệt */
export const validatePassword = (value) => {
  if (!value) return 'Mật khẩu không được để trống';
  if (value.length < 8) return 'Mật khẩu tối thiểu 8 ký tự';
  if (!/[A-Z]/.test(value)) return 'Mật khẩu cần ít nhất 1 chữ hoa';
  if (!/[a-z]/.test(value)) return 'Mật khẩu cần ít nhất 1 chữ thường';
  if (!/\d/.test(value)) return 'Mật khẩu cần ít nhất 1 chữ số';
  if (!/[^A-Za-z0-9]/.test(value)) return 'Mật khẩu cần ít nhất 1 ký tự đặc biệt';
  return '';
};

/** Validate username (sync): 3-20 ký tự, chỉ chữ/số/gạch dưới */
export const validateUsername = (value) => {
  if (!value.trim()) return 'Username không được để trống';
  if (value.length < 3) return 'Username tối thiểu 3 ký tự';
  if (value.length > 20) return 'Username tối đa 20 ký tự';
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username chỉ dùng chữ, số, gạch dưới';
  return '';
};

/** Validate số điện thoại VN: 10 số bắt đầu 0[3-9], hoặc +84[3-9]xxxxxxxx */
const PHONE_VN_REGEX = /^(0[3-9]\d{8}|\+84[3-9]\d{8})$/;

export const validatePhoneVN = (value) => {
  if (!value.trim()) return 'Số điện thoại không được để trống';
  const clean = value.replace(/\s/g, '');
  if (!PHONE_VN_REGEX.test(clean)) return 'Số điện thoại VN không hợp lệ (VD: 0912345678)';
  return '';
};

/** Validate tuổi: số nguyên 1-150 */
export const validateAge = (value) => {
  if (!value.trim()) return 'Tuổi không được để trống';
  const n = Number(value);
  if (isNaN(n) || !Number.isInteger(n)) return 'Tuổi phải là số nguyên';
  if (n < 1 || n > 150) return 'Tuổi phải từ 1 đến 150';
  return '';
};

/** Validate URL: phải bắt đầu http:// hoặc https://, parse bằng URL API */
export const validateUrl = (value) => {
  if (!value.trim()) return 'Website không được để trống';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return 'Website phải bắt đầu bằng http:// hoặc https://';
    }
    return '';
  } catch {
    return 'Website không hợp lệ (VD: https://example.com)';
  }
};

/** Validate họ tên: ≥2 từ, mỗi từ ≥2 ký tự */
export const validateFullName = (value) => {
  if (!value.trim()) return 'Họ tên không được để trống';
  const words = value.trim().split(/\s+/);
  if (words.length < 2) return 'Họ tên cần ít nhất 2 từ (họ và tên)';
  if (words.some((w) => w.length < 2)) return 'Mỗi từ trong họ tên cần ít nhất 2 ký tự';
  return '';
};
