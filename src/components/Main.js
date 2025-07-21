import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Button, Toolbar, Typography } from "@mui/material";
import Dashboard from "./Dashboard";
import Scans from "./Scans";

const Main = ({ onLogout }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard App
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
        {tab === 0 && <Dashboard />}
        {tab === 1 && <Scans />}
      </Box>
    </Box>
  );
};

export default Main;