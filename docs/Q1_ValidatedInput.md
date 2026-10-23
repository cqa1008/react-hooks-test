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
