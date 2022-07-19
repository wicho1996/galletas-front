import * as React from "react";
import Dialog from "@mui/material/Dialog";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogMod(props) {
  const { children, open, title, scroll, close } = props;

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        // maxWidth="lg"
        TransitionComponent={Transition}
        onClose={close}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        {children}
      </Dialog>
    </div>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  scroll: PropTypes.string,
};

Dialog.defaultProps = {
  open: false,
  scroll: "paper",
  children: <React.Fragment />,
};
