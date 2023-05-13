import * as React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  Slide,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useForm, FormProvider } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogMod(props) {
  const { open, title, scroll, close, accept, stage, propsstage } = props;
  const methods = useForm();

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    } else {
      methods.unregister();
    }
  }, [open]);

  const onSubmit = (data) => accept(data);
  const Stage = stage;

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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DialogContent dividers>
              {stage && <Stage {...propsstage} />}
            </DialogContent>
            <DialogActions>
              <Button onClick={close}>Cancelar</Button>
              <Button type="submit">Aceptar</Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </div>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  scroll: PropTypes.string,
  close: PropTypes.func,
  accept: PropTypes.func,
  stage: PropTypes.func,
  propsstage: PropTypes.object
};

export const dialogGeneralPropsDef = {
  open: false,
  title: '',
  scroll: "paper",
  close: null, 
  accept:  null, 
  stage: null, 
  propsstage: {}
}

Dialog.defaultProps = dialogGeneralPropsDef;
