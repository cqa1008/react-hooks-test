# Q1: Form Input Validation với useEffect()
## Đề bài
Create a ValidatedInput component that validates user input and shows an error message if the input is invalid. Use the useEffect hook to perform validation whenever the input value changes, simulating componentDidUpdate behavior. This exercise will help you understand how to use the useEffect hook for performing validation based on changes in state and the importance of the dependency array.
## Yêu cầu
- Validate user input dựa trên một hàm validation được truyền vào
- Hiển thị thông báo lỗi nếu input không hợp lệ
- Thực hiện validate mỗi khi giá trị input thay đổi
## Giải pháp
- Props: validate (nhận value, trả về chuỗi lỗi hoặc ""), label, placeholder, initialValue.
- State: value, error, touched.
- useEffect(() => { setError(validate(value)) }, [value, validate]).
- validate phải có tham chiếu ổn định (định nghĩa ngoài component hoặc useCallback ở App.jsx).
- Chỉ hiện lỗi sau khi người dùng đã gõ (touched).
- UI: MUI TextField với error={touched && Boolean(error)} và helperText.
- Demo trong App.jsx: validate email hoặc tối thiểu 3 ký tự.

## Giải pháp mở rộng
- Một component tái sử dụng cho 8 trường hợp: Email, Password, Confirm Password, Username (async), Phone VN, Tuổi, URL, Họ và tên.
- Password: toggle ẩn/hiện mật khẩu bằng IconButton (Visibility/VisibilityOff).
- Confirm Password: validate bằng useCallback([password]) để chứng minh tầm quan trọng của dependency array.
- Username: có kiểm tra async giả lập (admin, root, test = đã tồn tại), dùng cleanup flag chống race condition và hiển thị CircularProgress khi đang kiểm tra.
- Hỗ trợ debounceMs: hoãn validate cho các trường hợp gõ nhanh hoặc async call.
- Không dùng thư viện form, không dùng validator có sẵn của HTML/MUI.
