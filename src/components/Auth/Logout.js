import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Logout() {

    const navigate = useNavigate();

    const logout = () => {
    
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    
    setTimeout(() => {
        navigate('/');
      }, 1000)
    };
    useEffect(() => {
        setOpen(true);
        logout()
    }, [])
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      const [open, setOpen] = React.useState(false);
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Başarıyla Çıkış Yapıldı !
        </Alert>
      </Snackbar>
  )
}
