import React, {useState} from 'react'
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Stack, Avatar, Popover} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



const Navbar = () => {

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
            Home
          </Typography>
          <Typography variant="subtitle1" component="div" >
            Jobs
          </Typography>
          <Typography variant="subtitle1" component="div" >
            Browse
          </Typography>
          {/* <Button color="inherit">Login</Button> */}

          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={handleClick} />

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
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar