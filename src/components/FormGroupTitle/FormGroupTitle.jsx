import { Typography } from '@mui/material';

/**
 * FormGroupTitle — Tiêu đề phân nhóm cho các khối trường trong Form
 * Giúp tái sử dụng và đồng bộ phong cách thiết kế
 */
export default function FormGroupTitle({ children }) {
  return (
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'primary.main',
        mb: 2,
        pb: 1,
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        display: 'inline-block',
      }}
    >
      {children}
    </Typography>
  );
}
