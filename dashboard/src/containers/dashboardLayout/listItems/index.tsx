import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const adminMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon/>
      </ListItemIcon>
      <Link to="users">
        <ListItemText primary="Users" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <Link to="categories">
        <ListItemText primary="Categories" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <Link to="courses">
        <ListItemText primary="Courses" />
      </Link>
    </ListItemButton>
    
  </React.Fragment>
);

export const userMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="">
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <Link to="categories">
        <ListItemText primary="Categories" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <Link to="courses">
        <ListItemText primary="Courses" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);
