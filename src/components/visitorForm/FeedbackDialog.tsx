import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  open,
  onClose,
  title,
  message,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={onClose} autoFocus variant="contained">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default FeedbackDialog;
