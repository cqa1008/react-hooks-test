# Q2: Todo List
## Đề bài
Create a simple Todo List component that allows users to add new items, edit old items and delete items once completed.
## Yêu cầu
- Ô input để thêm todo mới
- Nút submit todo mới
- Hiển thị danh sách todo
- Nút edit cạnh mỗi todo để sửa
- Nút delete cạnh mỗi todo để xóa
- Dùng useState() để quản lý state danh sách todo
## Giải pháp
- State: todos (mảng { id, text }), newText, editingId, editText.
- Thêm: trim, không cho thêm chuỗi rỗng, Enter hoặc nút Add đều submit.
- Sửa: bấm Edit thì dòng đó thành input kèm nút Save/Cancel.
- Xóa: filter theo id.
- id dùng crypto.randomUUID(), key={todo.id}.
- UI: MUI TextField, Button/IconButton, List, ListItem, ListItemText, Paper; icon AddIcon, EditIcon, DeleteIcon, SaveIcon, CloseIcon.
