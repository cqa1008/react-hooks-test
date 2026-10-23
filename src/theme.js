import { createTheme } from '@mui/material/styles';

/**
 * Cấu hình MUI Theme hiện đại cho toàn ứng dụng
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5', // Indigo hiện đại
      light: '#6366f1',
      dark: '#4338ca',
    },
    secondary: {
      main: '#0ea5e9', // Sky blue
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#334155', // Xám đậm hơn một bậc để tăng tương phản
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#4f46e5',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& input::placeholder': {
            color: '#475569', // Tăng độ tương phản placeholder
            opacity: 0.85,
          },
          // Viền focus của mọi TextField chuyển sang màu primary
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4f46e5',
            borderWidth: '2px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4f46e5',
          },
        },
      },
    },
  },
});
