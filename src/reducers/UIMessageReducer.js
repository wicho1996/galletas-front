import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UIMessageReducer = (state = { estatus: 0, mensaje: '' }, action) => {
  return (
    <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
      <Alert onClose={() => {}} severity="success" sx={{ width: "100%" }}>
        {action.mensaje}
      </Alert>
    </Snackbar>
  );
};

export default UIMessageReducer;
