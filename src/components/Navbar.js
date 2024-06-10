import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BsList, BsPersonFill } from 'react-icons/bs'; 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './Navbar.css';

const Navbar = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const url = 'http://localhost:3001/auth/logout';
      await axios.post(url, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.error);
      }
    }
  };

  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: 'Home',
      sectionId: 'home-section',
    },
    {
      text: 'About',
      sectionId: 'about-section',
    },
    {
      text: 'Work',
      sectionId: 'how-it-works-section',
    },
    {
      text: 'Reviews',
      sectionId: 'reviews-section',
    },
    {
      text: 'Contact',
      sectionId: 'contact-section',
    },
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <div className="nav-logo-container"></div>
      <div className="navbar-links-container">
        {menuOptions.map((item) => (
          <Link key={item.text} to="/" onClick={() => scrollToSection(item.sectionId)}>
            {item.text}
          </Link>
        ))}
        <Link to="/user-profile" className='navbar-user-icon'>
          {/* User icon component */}
          user profile
        </Link>
        <button className="primary-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="navbar-menu-container">
        <BsList onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpenMenu(false)} onKeyDown={() => setOpenMenu(false)}>
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
