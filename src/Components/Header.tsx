import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ButtonLink } from "./ButtonLink";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { useAppDispatch } from "../hook";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            messenger
          </Typography>
          <Typography variant="h6" noWrap component="div">
            {location.pathname === "/dashboard" && (
              <ButtonLink path="/login" title="Logout" onClick={submitLogout} />
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
