import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

// Define the types for the snackbar message
interface SnackbarMessage {
  message: string;
  severity: AlertColor;
  key?: number; // Optional key for unique identification
}

// Define the context value type
interface SnackbarContextType {
  openSnackbar: (message: string, severity?: AlertColor) => void;
}

// Create the Snackbar context with the correct type
const SnackbarContext = createContext<SnackbarContextType | null>(null);

// Hook to use Snackbar context
// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

// Define the props for the provider
interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack(prev => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const openSnackbar = (message: string, severity: AlertColor = 'info') => {
    setSnackPack(prev => [...prev, { message, severity, key: new Date().getTime() }]);
  };

  const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Set the position to top-center
      >
        <Alert onClose={closeSnackbar} severity={messageInfo ? messageInfo.severity : 'info'} sx={{ width: '100%' }}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
