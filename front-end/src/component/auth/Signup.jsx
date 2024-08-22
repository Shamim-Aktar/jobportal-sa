import React from 'react'
import Navbar from '../../component/shared/Navbar'
import { TextField, Button, Box, Typography, FormControl, FormLabel } from '@mui/material';

const Signup = () => {

    const [formValues, setFormValues] = React.useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = React.useState({});

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
                            <FormLabel>Username</FormLabel>
                            <TextField
                                variant="outlined"
                                name="username"
                                value={formValues.username}
                                onChange={handleInputChange}
                                error={!!errors.username}
                                helperText={errors.username}
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
    )
}

export default Signup