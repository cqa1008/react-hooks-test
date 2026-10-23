# Rules cho AI Agent
- Đây là bài test React Hooks. Ưu tiên code ngắn gọn, dễ đọc, dễ giải thích.
- Stack: Vite + React 18 + JavaScript (JSX) + MUI (@mui/material, @mui/icons-material).
- MUI chỉ dùng cho UI. KHÔNG dùng thư viện form/state (react-hook-form, Formik, Redux...).
- Chỉ dùng useState, useEffect (useCallback nếu cần). Logic validate PHẢI tự viết bằng useEffect,
  không dùng validator có sẵn của MUI hay HTML (required, type="email", pattern).
- Đọc docs/PROJECT.md, docs/Q1_ValidatedInput.md, docs/Q2_TodoList.md trước khi code.
- Làm lần lượt từng bài, xong bài nào tick vào docs/TASKS.md bài đó.
- Mỗi component một thư mục riêng trong src/components/.
- Ưu tiên sx prop của MUI, không viết file CSS riêng cho component.
- Thêm comment tiếng Việt ngắn giải thích vì sao dùng hook và dependency array.
- Không tự ý thêm thư viện hay component ngoài phạm vi đề bài.
- Sau khi xong, chạy `npm run build` để chắc chắn không lỗi.
