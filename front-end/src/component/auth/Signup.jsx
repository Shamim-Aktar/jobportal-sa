import React, { useState } from 'react';
import Navbar from '../../component/shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import {
    TextField, Button,
    Box, Typography,
    FormControl, FormControlLabel,
    Radio, FormLabel,
    RadioGroup, Snackbar
} from '@mui/material';
import { setLoading } from '../../../redux/authSlice';
import { USER_API_END_POINT } from '../../utils/constant.js';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Signup = () => {
    const [formValues, setFormValues] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: null,  // Changed to null to better indicate no file
    });

    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const changeFileHandler = (e) => {
        setFormValues({ ...formValues, file: e.target.files?.[0] });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.fullname = formValues.fullname ? '' : 'Full Name is required.';
        tempErrors.email = formValues.email ? '' : 'Email is required.';
        tempErrors.password = formValues.password ? '' : 'Password is required.';
        tempErrors.phoneNumber = formValues.phoneNumber ? '' : 'Phone Number is required.';
        tempErrors.role = formValues.role ? '' : 'Role is required.';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        formData.append("fullname", formValues.fullname);
        formData.append("email", formValues.email);
        formData.append("phoneNumber", formValues.phoneNumber);
        formData.append("password", formValues.password);
        formData.append("role", formValues.role);
        if (formValues.file) {
            formData.append("file", formValues.file);
        }
        console.log('Form Data:', [...formData.entries()]);

        try {
            dispatch(setLoading(true))
            const res = await axios.post('http://localhost:3000/api/v1/user/register', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                setSnackbarMessage(res.data.message);
                setOpenSnackbar(true);
                navigate("/login");
            } else {
                setSnackbarMessage(res.data.message || "Registration failed.");
                setOpenSnackbar(true);
            }
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || "An error occurred. Please try again.");
            setOpenSnackbar(true);
            console.error(err);
        }

        finally {
            dispatch(setLoading(false))
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Navbar />
            <div>
                <Box
                    sx={{
                        width: 400,
                        margin: 'auto',
                        marginTop: 8,
                        padding: 4,
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                        Signup
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Full Name</FormLabel>
                            <TextField
                                variant="outlined"
                                name="fullname"
                                value={formValues.fullname}
                                onChange={handleInputChange}
                                error={!!errors.fullname}
                                helperText={errors.fullname}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Email</FormLabel>
                            <TextField
                                variant="outlined"
                                name="email"
                                value={formValues.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                required
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel>Phone Number</FormLabel>
                            <TextField
                                variant="outlined"
                                name="phoneNumber"
                                value={formValues.phoneNumber}
                                onChange={handleInputChange}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Password</FormLabel>
                            <TextField
                                variant="outlined"
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                required
                            />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel id="role">Role</FormLabel>
                            <RadioGroup
                                aria-labelledby="role"
                                name="role"
                                value={formValues.role}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="student" control={<Radio />} label="Student" />
                                <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                            <FormLabel>Profile</FormLabel>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                            />
                        </FormControl>



                        {
                            loading ? <button>loading</button> : <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Sign Up
                            </Button>

                        }
                    </form>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                />
            </div>
        </>
    );
};

export default Signup;
