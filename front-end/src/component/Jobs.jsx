import React from 'react'
import Navbar from './shared/Navbar'
import Filtercard from './Filtercard'
import { Grid, Box, Typography } from '@mui/material';
import Job from './Job';

const Jobs = () => {

    const jobsarray = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div>
            <Navbar />
            <Box sx={{ flexGrow: 1, padding: 3 }}>
                <Grid container spacing={3}>
                    {/* Filter Card */}
                    <Grid item xs={12} sm={4} md={3}>
                        <Filtercard />
                    </Grid>

                    {/* Jobs Grid */}
                    <Grid item xs={12} sm={8} md={9}>
                        {
                            jobsarray.length === 0
                                ? <Typography variant="h6">Job not found</Typography>
                                : (
                                    <Grid container spacing={3}>
                                        {
                                            jobsarray.map((item, index) => (
                                                <Grid item xs={12} sm={6} md={4} key={index}>
                                                    <Job />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                )
                        }
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Jobs;
