import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Feedback from './common/Feedback';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import i18nTexts from '../i18n/i18nTexts';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((v) => !v);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(form.user, form.pass);
    if (!ok) {
      setError('Credenciais inválidas');
      setShowSnackbar(true);
    } else {
      setError('');
      setShowSnackbar(false);
      navigate('/');
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label={i18nTexts.login.userLabel}
          name="user"
          value={form.user}
          onChange={handleChange}
          autoComplete="username"
          required
          fullWidth
          autoFocus
        />
        <TextField
          label={i18nTexts.login.passLabel}
          name="pass"
          type={showPassword ? 'text' : 'password'}
          value={form.pass}
          onChange={handleChange}
          autoComplete="current-password"
          required
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? i18nTexts.login.hidePassword
                        : i18nTexts.login.showPassword
                    }
                    onClick={handleShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    tabIndex={0}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 1 }}
          fullWidth
          aria-label={i18nTexts.login.submit}
        >
          {i18nTexts.login.submit}
        </Button>
      </Box>
      <Feedback
        open={showSnackbar && !!error}
        onClose={() => setShowSnackbar(false)}
        message={i18nTexts.login.error}
        variant="snackbar"
        severity="error"
        autoHideDuration={3500}
      />
    </>
  );
}
