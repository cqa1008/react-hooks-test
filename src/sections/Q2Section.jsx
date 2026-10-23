import { Box, Typography } from '@mui/material';
import TodoList from '../components/TodoList/TodoList';

/**
 * Q2Section — Khu vực demo Q2: Todo List Task Manager
 */
export default function Q2Section() {
  return (
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
  );
}
