import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Sidebar from "../Layouts/SideBar/Sidebar";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import DisplayVendors from "../Module/DisplayVendors/DisplayVendors";
import AddandUpdateVendors from "../Module/AddandUpdateVendors/AddandUpdateVendors";
import Home from "./HomePage/Home";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function MainPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  return (
    <div>
      <Router>
        <CssBaseline />
        <AppBar position="fixed" open={sidebarOpen}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleSidebarOpen}
              edge="start"
              sx={{ mr: 2, ...(sidebarOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, ml: 2 }}
              className="d-flex justify-content-end"
            >
              <Button variant="contained" color="error">
                Sign Out
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
        <Main open={sidebarOpen}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/VendorList" element={<DisplayVendors />} />
            <Route path="/AddVendorList" element={<AddandUpdateVendors />} />
          </Routes>
        </Main>
      </Router>
    </div>
  );
}

export default MainPage;
