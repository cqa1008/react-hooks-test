import { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

/**
 * TodoList — Q2: Todo List với useState
 *
 * State:
 *   - todos     : mảng { id, text } — danh sách các todo
 *   - newText   : string — giá trị ô input thêm todo mới
 *   - editingId : string | null — id của todo đang được sửa
 *   - editText  : string — giá trị input khi đang sửa
 *
 * Không dùng useEffect vì mọi thay đổi đều phát sinh từ event handler đồng bộ,
 * không có side effect cần đồng bộ với DOM hay external system.
 *
 * Dùng functional update (prev => ...) để tránh closure stale state.
 */
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Thêm todo mới: trim + không cho chuỗi rỗng
  const handleAdd = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    // Functional update: dùng prev để tránh closure cũ của todos
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed }]);
    setNewText('');
  };

  // Enter = Add (khi đang ở ô input thêm mới)
  const handleNewKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  // Bắt đầu sửa: lưu id đang sửa + copy text vào editText
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Lưu chỉnh sửa: không cho lưu nếu text rỗng sau trim
  const handleSave = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return; // giữ nguyên, không lưu
    // Functional update: map immutable, không mutate trực tiếp
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
    setEditingId(null);
    setEditText('');
  };

  // Hủy sửa: reset editingId
  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  // Enter = Save, Escape = Cancel khi đang sửa
  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') handleSave(id);
    if (e.key === 'Escape') handleCancel();
  };

  // Xóa: filter immutable theo id
  const handleDelete = (id) => {
    // Functional update: dùng prev để đảm bảo xóa đúng state mới nhất
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      {/* Ô nhập todo mới */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="Todo mới"
          placeholder="Nhập nội dung..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleNewKeyDown}
          fullWidth
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={!newText.trim()}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Add
        </Button>
      </Box>

      {/* Danh sách todo */}
      {todos.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          Chưa có todo nào. Thêm mới bên trên!
        </Typography>
      ) : (
        <List disablePadding>
          {/* key={todo.id} — dùng id ổn định, không dùng index */}
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              sx={{
                mb: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                px: 2,
                py: 0.5,
              }}
              secondaryAction={
                editingId === todo.id ? (
                  // Đang sửa: hiện Save + Cancel
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      edge="end"
                      size="small"
                      color="primary"
                      onClick={() => handleSave(todo.id)}
                      disabled={!editText.trim()}
                      aria-label="Lưu"
                    >
                      <SaveIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={handleCancel}
                      aria-label="Hủy"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  // Bình thường: hiện Edit + Delete
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleStartEdit(todo)}
                      aria-label="Sửa"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(todo.id)}
                      aria-label="Xóa"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )
              }
            >
              {editingId === todo.id ? (
                // Chế độ sửa: thay ListItemText bằng TextField
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                  size="small"
                  fullWidth
                  autoFocus
                  sx={{ mr: 10 }}
                  helperText={!editText.trim() ? 'Không được để trống' : ' '}
                  error={!editText.trim()}
                />
              ) : (
                <ListItemText primary={todo.text} />
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
