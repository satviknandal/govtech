import React, { ReactElement, useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

const initialUser = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: 'https://i.kym-cdn.com/photos/images/original/001/506/130/373.png' // dummy image url 
}

interface IAddDialogProps {
    addUserHandler: (x: any) => void;
}

const AddDialog: React.FC<IAddDialogProps> = ({ addUserHandler }): ReactElement => {
    const [user, setUser] = useState(initialUser);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAdd = () => {
        addUserHandler(user)
        setUser(initialUser)
        handleClose();
    }

    const handleChange = (name: any) => ({ target: { value } }: any) => {
        setUser({ ...user, [name]: value })
    }

    return (
        <>
            <Tooltip title="Add">
                <IconButton aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>Demo add item to react table.</DialogContentText>
                    <TextField
                        margin="dense"
                        label="ID"
                        type="number"
                        fullWidth
                        value={user.id}
                        onChange={handleChange('id')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={user.first_name}
                        onChange={handleChange('first_name')}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={user.last_name}
                        onChange={handleChange('last_name')}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={user.email}
                        onChange={handleChange('email')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddDialog;
