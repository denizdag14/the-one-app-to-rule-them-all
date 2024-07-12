"use client"

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ModeToggle } from './ModeToggle';
import { alpha, InputBase, styled, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const TopNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = ['Characters', 'Places', 'Books'];

  return (
    <>
      <AppBar position="static" className='bg-gradient-to-r from-yellow-600 to-yellow-500'>
        <Toolbar className='flex justify-between items-center'>
          <div className='flex items-center'>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="start"
              onClick={toggleSidebar}
              className='block md:hidden mr-2'
            >
              <MenuIcon />
            </IconButton>
            <Typography className='font-bold font-sans text-white mr-2' variant="h6" component="div">
              The One App
            </Typography>
            <Typography className='hidden sm:inline font-sans text-yellow-200 text-sm'>
              to rule them all
            </Typography>
          </div>
          
          <div className='hidden md:flex space-x-4'>
            {menuItems.map((item) => (
              <Button key={item} color="inherit">{item}</Button>
            ))}
          </div>
          
          <div className='flex items-center space-x-2'>
            <Search className='hidden sm:flex'>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <ModeToggle />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
      >
        <div className='p-4 text-white h-full bg-gradient-to-r from-yellow-600 to-yellow-500'>
          <div className='flex justify-between items-center mb-4'>
          <Typography className='font-bold font-sans text-white mr-2' variant="h6" component="div">
              The One App
            </Typography>
            <Typography className='hidden sm:inline font-sans text-yellow-200 text-sm'>
              to rule them all
            </Typography>
            <IconButton className='text-white ml-2' onClick={toggleSidebar} edge="end" aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <List>
            {menuItems.map((item) => (
              <ListItem className='rounded-lg' button key={item} onClick={toggleSidebar}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default TopNavbar;