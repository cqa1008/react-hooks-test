import { Container, Typography, Divider, Box } from '@mui/material';
import ValidatedInput from './components/ValidatedInput/ValidatedInput';
import TodoList from './components/TodoList/TodoList';

// Định nghĩa ngoài component để tham chiếu ổn định (không tạo mới mỗi render).
// Nếu đặt bên trong App, mỗi lần App re-render sẽ tạo hàm mới →
// useEffect trong ValidatedInput chạy lại liên tục (vòng lặp).
//
// Regex /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ yêu cầu:
//   - Trước @: ít nhất 1 ký tự, không phải space hay @
//   - Sau @: domain có ít nhất 1 ký tự, dấu chấm, rồi ≥2 ký tự TLD
//   → "avc@a." sẽ fail vì TLD sau dấu chấm cuối phải có ≥2 ký tự
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validateEmail = (value) => {
  if (!value.trim()) return 'Email không được để trống'; // bắt cả chuỗi chỉ khoảng trắng
  if (!EMAIL_REGEX.test(value)) return 'Email không hợp lệ';
  return '';
};

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Section Q1 */}
      <Typography variant="h4" component="h1" gutterBottom>
        Q1: ValidatedInput
      </Typography>
      <Box sx={{ mb: 4 }}>
        <ValidatedInput
          validate={validateEmail}
          label="Email"
          placeholder="Nhập email của bạn..."
          initialValue=""
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section Q2 */}
      <Typography variant="h4" component="h2" gutterBottom>
        Q2: Todo List
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TodoList />
      </Box>
    </Container>
  );
}

export default App;
