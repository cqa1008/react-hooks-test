import { ThemeProvider, CssBaseline, Container, Divider } from '@mui/material';
import { theme } from './theme';
import Q1Section from './sections/Q1Section';
import Q2Section from './sections/Q2Section';

/**
 * App — Root component
 * Đã refactor tinh gọn: cung cấp ThemeProvider, CssBaseline, Container bố cục
 * và tích hợp 2 section Q1 & Q2.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: 8 }}>
        {/* Section Q1: Form Validation với useEffect */}
        <Q1Section />

        <Divider sx={{ my: 6, borderColor: 'divider' }} />

        {/* Section Q2: Todo List */}
        <Q2Section />
      </Container>
    </ThemeProvider>
  );
}

export default App;
