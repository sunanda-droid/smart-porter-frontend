import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import data from "../data/data.json";

const Dashboard = () => {
  // Widgets
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" align="center">Users</Typography>
          <Typography variant="h4" align="center">{data.dashboard.users}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" align="center">Scans</Typography>
          <Typography variant="h4" align="center">{data.dashboard.scans}</Typography>
        </Paper>
      </Grid>
      {/* <Grid item xs={12} sm={4}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" align="center">Growth</Typography>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={data.dashboard.growth.map((value, idx) => ({ name: `M${idx + 1}`, value }))}>
              <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid> */}
      <Grid item xs={12} md={8}>
        <Paper elevation={2} sx={{ p: 2, height: 300 }}>
          <Typography variant="h6">Scan Stats (Monthly)</Typography>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data.dashboard.scanStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="scans" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;