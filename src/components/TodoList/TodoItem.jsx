import {
  Box,
  TextField,
  IconButton,
  ListItem,
  ListItemText,
  Chip,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

/**
 * TodoItem — Hiển thị một dòng todo (gồm chế độ hiển thị và chế độ chỉnh sửa)
 *
 * Props:
 *   - todo           : { id, text }
 *   - index          : number (số thứ tự)
 *   - isEditing      : boolean (đang sửa dòng này hay không)
 *   - editText       : string (nội dung đang sửa)
 *   - onStartEdit    : (todo) => void
 *   - onSave         : (id) => void
 *   - onCancel       : () => void
 *   - onDelete       : (id) => void
 *   - onEditTextChange: (val) => void
 *   - onEditKeyDown  : (e, id) => void
 */
export default function TodoItem({
  todo,
  index,
  isEditing,
  editText,
  onStartEdit,
  onSave,
  onCancel,
  onDelete,
  onEditTextChange,
  onEditKeyDown,
}) {
  return (
    <ListItem
      disablePadding
      sx={{
        border: '1px solid',
        borderColor: isEditing ? 'primary.main' : 'divider',
        borderRadius: 2,
        px: 2,
        py: 1,
        bgcolor: isEditing
          ? (theme) => alpha(theme.palette.primary.main, 0.04)
          : '#ffffff',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: isEditing ? 'primary.main' : 'primary.light',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
        },
      }}
      secondaryAction={
        isEditing ? (
          // Đang sửa: hiện Save + Cancel kèm Tooltip
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Lưu (Enter)" arrow>
              <span>
                <IconButton
                  edge="end"
                  size="small"
                  color="primary"
                  onClick={() => onSave(todo.id)}
                  disabled={!editText.trim()}
                  aria-label="Lưu"
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    },
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
                onClick={onCancel}
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
                onClick={() => onStartEdit(todo)}
                aria-label="Sửa"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  },
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
                onClick={() => onDelete(todo.id)}
                aria-label="Xóa"
                sx={{
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    >
      {isEditing ? (
        // Chế độ sửa: TextField nổi bật với autofocus và helperText
        <TextField
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          onKeyDown={(e) => onEditKeyDown(e, todo.id)}
          size="small"
          fullWidth
          autoFocus
          sx={{
            mr: 11,
            '& .MuiOutlinedInput-root': {
              bgcolor: '#ffffff',
              borderRadius: 1.5,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '2px',
              },
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
            slotProps={{
              primary: {
                sx: {
                  fontWeight: 500,
                  color: 'text.primary',
                  wordBreak: 'break-word',
                },
              },
            }}
          />
        </Box>
      )}
    </ListItem>
  );
}
