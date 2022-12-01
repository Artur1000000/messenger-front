import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IButtonLink } from "../types";

export const ButtonLink: React.FC<IButtonLink> = ({ path, title, onClick }) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }} onClick={onClick}>
      <Button
        variant={"outlined"}
        style={{ fontWeight: "600", fontSize: "12px" }}
      >
        {title}
      </Button>
    </Link>
  );
};
