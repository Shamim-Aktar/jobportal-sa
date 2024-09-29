import React, { useState } from 'react';
import {
    Dialog, DialogTitle, TextField, Button, Typography, CardContent, Grid, DialogContent,
    DialogActions, Snackbar
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/authSlice';

const UpdateProfileDialogue = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { user } = useSelector((store) => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '', // Convert array to comma-separated string
        file: user?.profile?.resume || null
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills.split(',').map(skill => skill.trim())); // Convert comma-separated string to array
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/api/v1/user/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                setSnackbarMessage(res.data.message);
                setSnackbarOpen(true);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            console.log(errorMessage);
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        height: 'auto',
                        minHeight: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }}
            >
                <DialogTitle align="center">Update Profile</DialogTitle>
                <DialogContent>
                    <form onSubmit={submitHandler}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                {/* Fullname Field */}
                                <Grid item xs={3}>
                                    <Typography variant="body1">Fullname:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Email Field */}
                                <Grid item xs={3}>
                                    <Typography variant="body1">Email:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        variant="outlined"
                                        type="email"
                                    />
                                </Grid>

                                {/* Phone Number Field */}
                                <Grid item xs={3}>
                                    <Typography variant="body1">Phone Number:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        variant="outlined"
                                        type="tel"
                                    />
                                </Grid>

                                {/* Bio Field */}
                                <Grid item xs={3}>
                                    <Typography variant="body1">Bio:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        variant="outlined"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>

                                {/* Skills Field */}
                                <Grid item xs={3}>
                                    <Typography variant="body1">Skills:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        name="skills"
                                        value={input.skills}
                                        variant="outlined"
                                        placeholder="E.g., JavaScript, React"
                                        onChange={changeEventHandler}
                                    />
                                </Grid>

                                {/* Resume Upload Field */}
                                <Grid item xs={3}>
                                    <Typography variant="body1">Resume:</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button variant="contained" component="label">
                                        Upload File
                                        <input type="file" hidden onChange={fileChangeHandler} />
                                    </Button>

                                    {input.file && (
                                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                            {input.file.name}
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </CardContent>
                        <DialogActions>
                            <Button color="secondary" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" disabled={loading}>
                                {loading ? 'Updating...' : 'Submit'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Snackbar for Success/Error Messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    );
};

export default UpdateProfileDialogue;
