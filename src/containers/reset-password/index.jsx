import { Box, Typography } from '@mui/material';
import ResetPasswordForm from './components/ResetPasswordForm';

export default function ForgotPassword() {
  return (
    <Box>
      <Typography mb={4} variant="h5">Reset Password</Typography>

      <ResetPasswordForm />
    </Box>
  );
}
