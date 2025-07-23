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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Smart Porter
            </Typography>
            <Button color="inherit" onClick={onLogout}>
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