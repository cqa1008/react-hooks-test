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
  Chip,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

/**
 * TodoList — Q2: Todo List với useState & Giao diện tối ưu MUI
 *
 * State:
 *   - todos     : mảng { id, text } — danh sách các todo
 *   - newText   : string — giá trị ô input thêm todo mới
 *   - editingId : string | null — id của todo đang được sửa
 *   - editText  : string — giá trị input khi đang sửa
 *
 * Không dùng useEffect vì mọi thay đổi đều xuất phát từ user event handler đồng bộ.
 * Dùng functional update (prev => ...) cho add, edit, delete để tránh closure stale state.
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
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header bar với tiêu đề phụ và Badge đếm số lượng */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: 2,
              bgcolor: 'primary.50',
              color: 'primary.main',
            }}
          >
            <FormatListBulletedIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Danh sách công việc
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Quản lý state CRUD với functional updates
            </Typography>
          </Box>
        </Box>

        <Chip
          label={`${todos.length} công việc`}
          size="small"
          color={todos.length > 0 ? 'primary' : 'default'}
          variant={todos.length > 0 ? 'filled' : 'outlined'}
          sx={{ fontWeight: 600, borderRadius: 2 }}
        />
      </Box>

      {/* Ô nhập todo mới */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        <TextField
          label="Nội dung công việc mới"
          placeholder="Nhập việc cần làm rồi bấm Add hoặc Enter..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleNewKeyDown}
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused': {
                boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}1F`,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'text.secondary' }}>
                  <TaskAltIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={!newText.trim()}
          sx={{
            px: 3,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
            transition: 'all 0.2s',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(79, 70, 229, 0.4)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Thêm
        </Button>
      </Box>

      {/* Danh sách todo */}
      {todos.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            px: 2,
            bgcolor: '#f8fafc',
            borderRadius: 2.5,
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <AssignmentTurnedInIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
            Chưa có todo nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nhập việc cần làm vào ô phía trên rồi nhấn Thêm hoặc Enter!
          </Typography>
        </Box>
      ) : (
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* key={todo.id} — dùng id ổn định, không dùng index */}
          {todos.map((todo, index) => (
            <ListItem
              key={todo.id}
              disablePadding
              sx={{
                border: '1px solid',
                borderColor: editingId === todo.id ? 'primary.main' : 'divider',
                borderRadius: 2,
                px: 2,
                py: 1,
                bgcolor: editingId === todo.id ? '#f5f3ff' : '#ffffff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: editingId === todo.id ? 'primary.main' : 'primary.light',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
                },
              }}
              secondaryAction={
                editingId === todo.id ? (
                  // Đang sửa: hiện Save + Cancel kèm Tooltip
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Lưu (Enter)" arrow>
                      <span>
                        <IconButton
                          edge="end"
                          size="small"
                          color="primary"
                          onClick={() => handleSave(todo.id)}
                          disabled={!editText.trim()}
                          aria-label="Lưu"
                          sx={{
                            bgcolor: 'primary.50',
                            '&:hover': { bgcolor: 'primary.100' },
                          }}
                        >
                          <SaveIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Hủy (Escape)" arrow>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={handleCancel}
                        aria-label="Hủy"
                        sx={{
                          ml: 0.5,
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  // Bình thường: hiện Edit + Delete kèm Tooltip
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleStartEdit(todo)}
                        aria-label="Sửa"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main', bgcolor: 'primary.50' },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa" arrow>
                      <IconButton
                        edge="end"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(todo.id)}
                        aria-label="Xóa"
                        sx={{
                          '&:hover': { bgcolor: 'error.50' },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )
              }
            >
              {editingId === todo.id ? (
                // Chế độ sửa: TextField nổi bật với autofocus và helperText
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
                  size="small"
                  fullWidth
                  autoFocus
                  sx={{
                    mr: 11,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#ffffff',
                      borderRadius: 1.5,
                    },
                  }}
                  helperText={!editText.trim() ? 'Nội dung không được để trống' : 'Nhấn Enter để lưu, Escape để hủy'}
                  error={!editText.trim()}
                />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pr: 9, py: 0.5, width: '100%' }}>
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      bgcolor: 'grey.100',
                      color: 'text.secondary',
                      borderRadius: 1,
                    }}
                  />
                  <ListItemText
                    primary={todo.text}
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 500,
                        color: 'text.primary',
                        wordBreak: 'break-word',
                      },
                    }}
                  />
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
