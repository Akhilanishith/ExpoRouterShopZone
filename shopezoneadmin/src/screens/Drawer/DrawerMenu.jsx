import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { IoIosContact } from "react-icons/io"; 
import { VscListUnordered } from 'react-icons/vsc';
import { FaCartArrowDown } from 'react-icons/fa';
import { CgWindows } from 'react-icons/cg';

const DrawerMenu = () => {
  const location = useLocation(); // To get the current route location
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sellersOpen, setSellersOpen] = useState(false); // State to toggle Sellers sub-menu

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const getStyle = (isActive, isHovered) => {
    return {
      backgroundColor: isActive || isHovered ? '#FECACA' : 'transparent',
      borderRadius: '20px',
      padding: '12px',
      display: 'flex',
      alignItems: 'center',
      color: isActive || isHovered ? '#F43F5E' : '#374151',
      boxShadow: isHovered || isActive ? '0px 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      fontWeight: isActive ? 'bold' : 'normal',
    };
  };

  const menuItems = [
    { name: 'Dashboard', link: '/admin-dashboard', icon: <CgWindows /> },
    { name: 'Users', link: '/users', icon: <IoIosContact />},
    { 
      name: 'Sellers', 
      link: '/sellers', 
      icon: <DashboardIcon />, 
      subItems: [
        { name: 'All sellers', link: '/sellers/allsellers' },
        { name: 'Pending Sellers', link: '/sellers/pending' },
        { name: 'Verified Sellers', link: '/sellers/verified' }
      ],
      toggleSubItems: () => setSellersOpen(!sellersOpen)
    },
    { name: 'Orders', link: '/orders', icon: <VscListUnordered /> },
    { name: 'Carts', link: '/carts', icon: <FaCartArrowDown />},
    { name: 'Brands', link: '/SellerBrandVerification', icon: <FaCartArrowDown />},
    { name: 'AdminBrand', link: '/adminbrand', icon: <FaCartArrowDown />},
    { name: 'category', link: '/Category', icon: <FaCartArrowDown />},
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#F9FAFB',
          paddingTop: '20px',
        },
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.link);
          const isHovered = hoveredItem === item.name;

          return (
            <React.Fragment key={item.name}>
              <ListItem
                button
                component={Link}
                to={item.subItems ? undefined : item.link} // Prevent navigation on parent click if it has subitems
                sx={getStyle(isActive, isHovered)}
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
                onClick={item.subItems ? item.toggleSubItems : undefined} // Toggle subitems on click if available
              >
                {item.icon && (
                  <span style={{ marginRight: '10px', color: isActive || isHovered ? '#F43F5E' : '#9CA3AF' }}>
                    {item.icon}
                  </span>
                )}
                <Typography variant="body1" sx={{ fontWeight: isActive ? 'bold' : 'normal' }}>
                  {item.name}
                </Typography>
              </ListItem>
              {item.subItems && sellersOpen && (
                <List sx={{ paddingLeft: '20px' }}>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.name}
                      button
                      component={Link}
                      to={subItem.link}
                      sx={getStyle(location.pathname === subItem.link, hoveredItem === subItem.name)}
                      onMouseEnter={() => handleMouseEnter(subItem.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Typography variant="body2">{subItem.name}</Typography>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
