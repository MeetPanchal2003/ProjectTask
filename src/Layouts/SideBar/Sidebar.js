import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Info as InfoIcon,
  Call as CallIcon,
} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Button from "@mui/material/Button";
import "./Sidebar.css";
import VSPlogo from "../../Assets/VSPlogo.png"; // Import your company logo component

const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const [openList, setOpenList] = React.useState(false);
  const [openNestedList, setOpenNestedList] = React.useState(false);

  const handleListClick = () => {
    setOpenList(!openList);
  };

  const handleNestedListClick = () => {
    setOpenNestedList(!openNestedList);
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {/* <CssBaseline /> */}
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml: 2 }} className='d-flex justify-content-end'>
          <Button variant="contained" color="error">
            Sign Out
          </Button>
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={VSPlogo} className="vsplogo" />
          <IconButton onClick={onClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="pb-0">
          {["Home", "Aboutus", "Contact us"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text === "Home" ? (
                    <HomeIcon />
                  ) : text === "Aboutus" ? (
                    <InfoIcon />
                  ) : text === "Contact us" ? (
                    <CallIcon />
                  ) : text === "Help" ? (
                    <ContactSupportIcon />
                  ) : (
                    ""
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List className="pt-0">
          <ListItem className="pointer" onClick={handleListClick}>
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary={"Help"} />
            <ListItemIcon className="d-flex justify-content-end">
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItem>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" className="ps-3" disablePadding>
              <ListItem className="pointer">
                <ListItemText primary="Website 1" />
              </ListItem>
              <ListItem className="pointer" onClick={handleNestedListClick}>
                <ListItemText primary="Website 2" />
                {openNestedList ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                <List component="div" className="ps-3" disablePadding>
                  <ListItem className="pointer">
                    <ListItemText primary="Website 1" />
                  </ListItem>
                  <ListItem className="pointer">
                    <ListItemText primary="Website 2" />
                  </ListItem>
                  <ListItem className="pointer">
                    <ListItemText primary="Website 3" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem className="pointer">
                <ListItemText primary="Website 3" />
              </ListItem>
            </List>
          </Collapse>
          {/* <List component="nav" disablePadding>
      <ListItem button onClick={handleListClick} className='pointer'>
        <ListItemText primary="Main Dropdown" />
      </ListItem>
      <Collapse in={openList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={handleNestedListClick} className='pointer'>
            <ListItemText primary="Nested Dropdown" />
          </ListItem>
          <Collapse in={openNestedList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className='pointer'>
                <ListItemText primary="Website 1" />
              </ListItem>
              <ListItem className='pointer'>
                <ListItemText primary="Website 2" />
              </ListItem>
              <ListItem className='pointer'>
                <ListItemText primary="Website 3" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Collapse>
    </List> */}
        </List>
        <Divider />
      </Drawer>
      {/* <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main> */}
    </>
  );
}
