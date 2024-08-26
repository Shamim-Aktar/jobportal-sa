import React, { useState } from 'react'
import Navbar from '../../component/shared/Navbar'
import { TextField, Button, Box, Typography, FormControl, FormControlLabel, Radio, FormLabel, RadioGroup } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {

    const [formValues, setFormValues] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ""
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };



    const validate = () => {
        let tempErrors = {};
        tempErrors.username = formValues.username ? "" : "Username is required.";
        tempErrors.email = formValues.email ? "" : "Email is required.";
        tempErrors.password = formValues.password ? "" : "Password is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = () => {
        console.log('form')
    }
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
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value={formValues.role == 'student'} control={<Radio />} label="Student" />
                                <FormControlLabel value={formValues.role == 'recruiter'} control={<Radio />} label="Recruiter" />
                                {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Login
                        </Button>

                        <span>Don't have an account? <Link to="/signup" >Signup</Link></span>
                    </form>
                </Box>
            </div>
        </>
    )
}

export default Login