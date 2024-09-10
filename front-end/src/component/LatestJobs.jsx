import React from 'react'
import LatestJobCards from './LatestJobCards'
import { Typography, TextField, Box, Grid, Card } from '@mui/material'
// import { Grid } from '@mui/material/Grid2';


const LatestJobs = () => {

    const randomjob = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <>
            <h1>Job Openings</h1>


            <Grid container >

                <Grid item  >
                    <Box sx={{ flexGrow: 1 }} >
                        {
                            randomjob.slice(0, 6).map((item, index) => <LatestJobCards />)

                        }
                    </Box>
                </Grid>


            </Grid>




            {/* <Box sx={{ flexGrow: 1 }}>
                <Grid item xs={4}>
                    {
                        randomjob.map((item, index) => <LatestJobCards />)

                    }
                </Grid>
            </Box> */}


        </>
    )
}

export default LatestJobs