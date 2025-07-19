import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Collapse,
  type AlertColor,
} from '@mui/material';

export interface FeedbackProps {
  open: boolean;
  onClose: () => void;
  message: string;
  variant?: 'dialog' | 'inline' | 'snackbar';
  severity?: AlertColor;
  title?: string;
  okLabel?: string;
  autoHideDuration?: number;
}

const Feedback: React.FC<FeedbackProps> = ({
  open,
  onClose,
  message,
  variant = 'dialog',
  severity = 'error',
  title = 'Atenção',
  okLabel = 'OK',
  autoHideDuration = 3500,
}) => {
  if (variant === 'inline') {
    return (
      <Collapse in={open} sx={{ width: '100%' }}>
        <Alert severity={severity} onClose={onClose} variant="filled">
          {message}
        </Alert>
      </Collapse>
    );
  }
  if (variant === 'snackbar') {
    return (
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={onClose}
        autoHideDuration={autoHideDuration}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
          onClose={onClose}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus variant="contained">
          {okLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Feedback;
