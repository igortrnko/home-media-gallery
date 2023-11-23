import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, FC } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" className="items-end" ref={ref} {...props} />;
});

interface UploadProgressDialogProps {
  progress: number | null;
  open: boolean;
}

const UploadProgressDialog: FC<UploadProgressDialogProps> = ({
  open,
  progress = 0,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Otpremanje slika</DialogTitle>
      <DialogContent>
        <LinearProgress
          className="h-2 rounded-full"
          variant="determinate"
          value={progress || 0}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UploadProgressDialog;
