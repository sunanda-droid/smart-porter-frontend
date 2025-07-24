import React, { useState,useEffect } from "react";
import { AppBar, Tabs, Tab, Box, Button, Toolbar, Typography } from "@mui/material";
import Dashboard from "./Dashboard";
import Scans from "./Scans";

const Main = ({ onLogout }) => {
  const [tab, setTab] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [scansData, setScansData] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };


   useEffect(() => {
     fetch("./dashboard.json")
    .then((res) => res.json())
    .then((data) => {
      setDashboardData(data.dashboard);
    })
    .catch((error) => {
      console.error("Error fetching dashboard data:", error);
    });
  }, []);


  return (
    dashboardData && (
      <Box>
        <AppBar position="static" elevation={4} sx={{
          background: 'linear-gradient(90deg, #1b5e20 0%, #388e3c 100%)',
          boxShadow: '0 4px 24px rgba(27, 94, 32, 0.18)'
        }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box sx={{
                width: 44,
                height: 44,
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: 2,
                overflow: 'hidden',
                p: 0.5
              }}>
                <img
                  src={process.env.PUBLIC_URL + '/smartporter-logo.png'}
                  alt="SmartPorter Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="h5" sx={{
                fontWeight: 700,
                letterSpacing: 2,
                color: 'white',
                textShadow: '1px 2px 8px rgba(27,94,32,0.25)'
              }}>
                Smart Porter
              </Typography>
            </Box>
            <Button color="inherit" onClick={onLogout} sx={{
              fontWeight: 600,
              border: '1.5px solid #fff',
              borderRadius: 2,
              px: 3,
              ml: 2,
              background: 'rgba(255,255,255,0.08)',
              transition: 'background 0.2s',
              '&:hover': {
                background: 'rgba(255,255,255,0.18)'
              }
            }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Dashboard" /> 
          <Tab label="Scans" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {tab === 0 && <Dashboard data={dashboardData} />}
          {tab === 1 && <Scans/>}
        </Box>
      </Box>
    )
  );
};

export default Main;