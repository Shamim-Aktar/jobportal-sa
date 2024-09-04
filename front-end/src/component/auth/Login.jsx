import React, { useState } from 'react'
import Navbar from '../../component/shared/Navbar'
import { TextField, Button, Box, Typography, FormControl, FormControlLabel, Radio, FormLabel, RadioGroup, Snackbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/authSlice';

const Login = () => {

    const [formValues, setFormValues] = useState({

        email: '',
        password: '',
        role: '',
    });



    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
            role: e.target.value,
        });
    };

    // const handleInputChange = (event) => {
    //     setFormValues({
    //         ...formValues,
    //         role: event.target.value,
    //     });
    // };
    const { loading } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validate = () => {
        let tempErrors = {};
        tempErrors.username = formValues.username ? "" : "Username is required.";
        tempErrors.email = formValues.email ? "" : "Email is required.";
        tempErrors.password = formValues.password ? "" : "Password is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if (!validate()) return;

        try {

            dispatch(setLoading(true))
            const res = await axios.post('http://localhost:3000/api/v1/user/login', formValues, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                setSnackbarMessage(res.data.message);
                setOpenSnackbar(true);
                navigate("/");
            } else {
                setSnackbarMessage(res.data.message || "login failed.");
                setOpenSnackbar(true);
            }
        } catch (err) {
            setSnackbarMessage(err.response?.data?.message || "An error occurred. Please try again.");
            setOpenSnackbar(true);
            console.error(err);
        } finally {
            dispatch(setLoading(false))
        }
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
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}  >
                        Signup
                    </Typography>
                    <form onSubmit={handleSubmit}>

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

                        <FormControl>
                            <FormLabel id="student">Role</FormLabel>
                            <RadioGroup value={formValues.role} onChange={handleInputChange} name='role'>
                                <FormControlLabel
                                    value="student"
                                    control={<Radio />}
                                    label="Student"
                                    name='student'
                                />
                                <FormControlLabel
                                    value="recruiter"
                                    control={<Radio />}
                                    label="Recruiter"
                                    name='recruiter'
                                />
                            </RadioGroup>
                        </FormControl>
                        {
                            loading ? <button>loading</button> : <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Login
                            </Button>

                        }




                        <span>Don't have an account? <Link to="/signup" >Signup</Link></span>
                    </form>
                </Box>
            </div>
        </>
    )
}

export default Login