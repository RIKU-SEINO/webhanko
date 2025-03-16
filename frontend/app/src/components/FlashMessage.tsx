import { Snackbar, Alert } from "@mui/material";

interface FlashMessageProps {
  message: string;
  severity: "success" | "error" | "warning" | "info";
  open: boolean;
  onClose: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, severity, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ marginTop: '20px' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FlashMessage;
