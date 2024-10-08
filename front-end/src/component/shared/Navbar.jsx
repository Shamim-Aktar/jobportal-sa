import React, { useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Stack, Avatar, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../../redux/authSlice';


const Navbar = () => {



  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Jobportal
          </Typography>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            <Typography variant="subtitle1" component="div"  >
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <Link to="/jobs">Jobs</Link>
            </Typography>
            <Typography variant="subtitle1" component="div" >
              <Link to="/browse">Browse</Link>
            </Typography>
            {/* <Button color="inherit">Login</Button> */}

            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={handleClick} />


            {
              !user ? (
                <div >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                  >
                    <Link to="/login"><Button variant="contained">
                      Login
                    </Button></Link>
                    <Link to="/signup">
                      <Button variant="outlined" color="error">
                        Signup
                      </Button>
                    </Link>
                  </Stack>
                </div>
              ) : (
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Typography sx={{ p: 2 }}><Link to="/profile">View Profile</Link></Typography>
                </Popover>
              )
            }


          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar