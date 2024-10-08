import { Typography, TextField, Button } from '@mui/material'
import React from 'react'
import './HeroSection.css'
import SearchIcon from '@mui/icons-material/Search';


const HeroSection = () => {
    return (
        <div className='hero-container'>
            <Typography variant="subtitle1" component="span" className='app-title'>
                No.1 Job Hunt Website
            </Typography>
            <Typography variant="h3" className='text-represent' component="h1" style={{ fontWeight: 'bold' }}>
                Search Apply  & <br /> Get Your <span> Dream Job</span>
            </Typography>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

            <TextField id="outlined-basic" label="Find your dream job" variant="outlined" />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
            >
                <SearchIcon />
            </Button>
        </div>
    )
}

export default HeroSection