import React, { useState } from "react";
import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Scans = () => {
  // List of repositories for dropdown (mocked for now)
  const repoOptions = [

   {"repo": "java-hello-world-with-maven", "value": "https://github.com/jabedhasan21/java-hello-world-with-maven"},
   {"repo": "springbootwebapp", "value": "https://github.com/springframeworkguru/springbootwebapp"},
   {"repo": "springboot-project", "value": "https://github.com/sqmax/springboot-project"},
   {"repo": "public-api-java", "value": "https://github.com/DependencyTrack/public-api-java"},
   {"repo": "javaparser-maven-sample", "value": "https://github.com/javaparser/javaparser-maven-sample"},
   {"repo": "spring-petclinic", "value": "https://github.com/spring-projects/spring-petclinic"}
  ];

  const [selectedRepo, setSelectedRepo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate API call on Run
  const handleRun = async () => {
    if (!selectedRepo) return;
    setLoading(true);
    try {
      const res = await axios.get("/scans.json");
      // const res = await axios.get(`/mavenScan?repo=${selectedRepo}`);
      setTableData(res.data.scans || []);
    } catch (err) {
      setTableData([]);
    }
    setLoading(false);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSummary, setDialogSummary] = useState("");

  const handleSummaryClick = (scan) => {
    setDialogSummary(scan.compatibilitySummary || "No summary available");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogSummary("");
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          mt: 3,
          width: '100%',
          maxWidth: '100vw',
          mx: 0,
          p: 2,
        }}
      >
      {/* Dropdown and Run button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 220 }} size="small">
          <InputLabel id="repo-label">Select Repository</InputLabel>
          <Select
            labelId="repo-label"
            value={selectedRepo}
            label="Select Repository"
            onChange={e => setSelectedRepo(e.target.value)}
          >
            {repoOptions.map(repo => (
              <MenuItem key={repo.repo} value={repo.value}>{repo.repo}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedRepo || loading}
          onClick={handleRun}
        >
          {loading ? "Loading..." : "Run"}
        </Button>
      </Box>
      {tableData.length > 0 &&
      <Table sx={{ width: '100%', minWidth: 1100, tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.light' }}>
            <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '14%' }}>Group Id</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '16%' }}>Artifact Id</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '13%' }}>Current Version</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '13%' }}>Latest Version</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '14%' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, color: '#111', fontSize: 16, width: '30%' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((scan, idx) => (
            <TableRow
              key={scan.id}
              sx={{
                backgroundColor: idx % 2 === 0 ? 'grey.100' : 'background.paper',
                '&:hover': { backgroundColor: 'grey.200' },
                transition: 'background 0.2s',
              }}
            >
              <TableCell sx={{ fontSize: 14, width: '14%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.groupId}</TableCell>
              <TableCell sx={{ fontSize: 14, width: '16%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.artifactId}</TableCell>
              <TableCell sx={{ fontSize: 14, width: '13%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.currentVersion}</TableCell>
              <TableCell sx={{ fontSize: 14, width: '13%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{scan.latestVersion}</TableCell>
              <TableCell sx={{ fontSize: 14, width: '14%' }}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    display: 'inline-block',
                    color:
                      scan.status === 'Up-to-date'
                        ? 'success.light'
                        : scan.status === 'Outdated'
                        ? 'info.light'
                        : 'error.light',
                    color:
                      scan.status === 'Up-to-date'
                        ? 'success.dark'
                        : scan.status === 'Outdated'
                        ? 'info.dark'
                        : 'error.dark',
                    fontWeight: 600,
                  }}
                >
                  {scan.status}
                </Box>
              </TableCell>
              <TableCell sx={{ fontSize: 14, width: '30%' }}>
                <Button
                  variant="outlined"
                  color="success"
                  size="medium"
                  sx={{ mr: 2, fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
                  onClick={() => handleSummaryClick(scan)}
                >
                  Compatibility Summary
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="medium"
                  sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none' }}
                  onClick={() => alert(`AutoUpgrade for ${scan.artifactId}`)}
                  disabled={scan.compatibilityFlag === false}
                >
                  AutoUpgrade
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Compatibility Summary</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ py: 2 }}>
            {dialogSummary}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" variant="contained">Close</Button>
        </DialogActions>
        </Dialog>
      </>
  );
}

export default Scans;