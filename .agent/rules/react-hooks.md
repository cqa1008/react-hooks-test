# Quy tắc React Hooks
- State cập nhật immutable (map, filter, spread), không mutate trực tiếp.
- Render danh sách dùng key ổn định (id), không dùng index.
- Dependency array của useEffect phải đầy đủ, không tắt eslint rule để lách.
- Hàm truyền qua props vào dependency array phải ổn định (định nghĩa ngoài component hoặc useCallback).
- Không gọi setState vô điều kiện trong useEffect gây vòng lặp render.
