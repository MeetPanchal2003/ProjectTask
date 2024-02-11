import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import {
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  Info as InfoIcon,
  Call as CallIcon,
} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import "./Sidebar.css";
import VSPlogo from "../../Assets/VSPlogo.png"; // Import your company logo component

const drawerWidth = 240;

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
  const navigate = useNavigate();

  const [openList, setOpenList] = React.useState(false);
  const [openNestedList, setOpenNestedList] = React.useState(false);

  const handleListClick = () => {
    setOpenList(!openList);
  };

  const handleNestedListClick = () => {
    setOpenNestedList(!openNestedList);
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        className="BrightYellow"
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className="BrightYellow text-black">
          <DrawerHeader>
            <img src={VSPlogo} className="vsplogo" alt="vsplogo"/>
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
            
            <ListItem disablePadding>
              <ListItemButton onClick={()=>{navigate("/"); onClose()}}>
                <ListItemIcon>
                  <HomeIcon className="text-black" />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>{onClose()}}>
                <ListItemIcon>
                  <InfoIcon className="text-black" />
                </ListItemIcon>
                <ListItemText primary={"About us"} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>{onClose()}}>
                <ListItemIcon>
                  <CallIcon className="text-black" />
                </ListItemIcon>
                <ListItemText primary={"Contact us"} />
              </ListItemButton>
            </ListItem>
          </List>

          <List className="pt-0">
            <ListItem className="pointer" onClick={handleListClick}>
              <ListItemIcon>
                <ContactSupportIcon className="text-black" />
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
          </List>
        </div>
        <Divider />
      </Drawer>
    </>
  );
}
