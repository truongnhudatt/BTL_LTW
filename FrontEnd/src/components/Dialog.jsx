import { useEffect, useMemo, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({onDialog, handleDialogAddress}) {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const sendData = () => {
        const data = {
            name: name,
            phone: phone,
            address: address
        };
        handleDialogAddress(data);
        onDialog(false);
    }

  return (
    <div>
      {/* <Dialog open={open} onClose={handleClose}> */}
        <DialogTitle>Giao hàng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập địa chỉ nhận hàng
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ và tên"
            type="tẽt"
            fullWidth
            variant="outlined"
            onChange={e => {setName(e.target.value)}}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số điện thoại"
            type="text"
            fullWidth
            variant="outlined"
            onChange={e => setPhone(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Địa chỉ nhận hàng"
            type="text"
            fullWidth
            variant="outlined"
            onChange={e => setAddress(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDialog(false)}>Huỷ</Button>
          <Button onClick={() => {sendData()}}>Xác nhận</Button>
        </DialogActions>
      {/* </Dialog> */}
    </div>
  );
}