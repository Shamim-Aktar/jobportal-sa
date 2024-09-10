import React from 'react';
import { Grid, CardActions, Button, Card, CardContent, Box, Stack, Typography, Avatar, Chip } from '@mui/material';
import BookmarkBorderSharpIcon from '@mui/icons-material/BookmarkBorderSharp';

const Job = () => {
    return (
        <div>
            <Card raised={true} sx={{ bgcolor: "#f5f5f5", borderRadius: '12px', padding: 2 }} >
                {/* Header with Date and Bookmark */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" color="textSecondary">
                        2 days ago
                    </Typography>
                    <BookmarkBorderSharpIcon sx={{ color: "#757575", cursor: "pointer" }} />
                </Box>

                <CardContent sx={{ padding: 0 }}>
                    {/* Company Info */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar alt="Company Logo" src="/static/images/avatar/1.jpg" />
                        <Box>
                            <Typography component="h6" fontWeight="bold" fontSize="16px">
                                Company Name
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                India
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        <Typography component="h6" fontWeight="bold" fontSize="16px">
                            Title
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            This impressive paella is a perfect party dish and a fun meal to cook
                        </Typography>
                    </Box>

                </CardContent>
                <Box>
                    <Stack direction="row" spacing={2} sx={{ marginTop: '20px' }}>
                        <Chip label="12 positions" color="primary" />
                        <Chip label="Part-time" color="primary" />
                        <Chip label="24 LPA" color="primary" />
                    </Stack>
                </Box>

                <CardActions >
                    <Button variant="outlined" color="success">
                        Details
                    </Button>
                    <Button variant="outlined" sx={{
                        backgroundColor: '#6A38C2',
                        borderColor: '#6A38C2',
                        color: '#ffffff',

                    }}>
                        save For Later
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Job;
