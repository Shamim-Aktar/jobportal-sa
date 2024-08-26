import React, { useState } from 'react';
import Navbar from '../../component/shared/Navbar';
import { TextField, Button, Box, Typography, FormControl, FormControlLabel, Radio, FormLabel, RadioGroup } from '@mui/material';

const Signup = () => {
    const [formValues, setFormValues] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    });

    const [errors, setErrors] = useState({});

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
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('userdata', formValues);
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

                        <FormLabel>Profile</FormLabel>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Box>
            </div>
        </>
    );
};

export default Signup;
