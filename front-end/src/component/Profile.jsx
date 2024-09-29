import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import UpdateProfileDialogue from './UpdateProfileDialogue';
import { useSelector } from 'react-redux';

export const Profile = () => {


    const isResume = true;
    const [open, setOpen] = useState(false);

    const { user } = useSelector(store => store.auth)

    console.log(user)
    return (
        <>
            <Navbar />

            <Card sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
                {/* Avatar and Name Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                        // src={user.avatar}
                        // alt={user.name}
                        sx={{ width: 100, height: 100, marginBottom: 2 }}
                    />
                </Box>

                <CardContent>
                    {/* Name */}
                    <Typography variant="h5" component="div" align="center">
                        Fullname:{user?.fullname}
                    </Typography>

                    {/* Bio */}
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ marginY: 2 }}>
                        Bio {user?.profile?.bio}
                    </Typography>

                    {/* Skills */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, marginBottom: 2 }}>
                        {user?.profile?.skills.map((skill, index) => (
                            <Chip key={index} label={skill} color="primary" variant="outlined" />
                        ))}
                        skills
                    </Box>

                    {/* Contact Information */}
                    <Typography variant="body2" color="text.secondary" align="center">
                        <strong>Email:</strong> {user?.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" align="center">
                        <strong>Email:</strong> {user?.phoneNumber}
                    </Typography>



                    <Box sx={{ marginTop: 2, textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                            Edit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <UpdateProfileDialogue open={open} setOpen={setOpen} />
        </>
    )
}

export default Profile
