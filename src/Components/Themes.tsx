import React from "react";
import {  useAppSelector } from "../hook";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IThemesProps {
  handleChange: (e: SelectChangeEvent) => void;
  itemTag: string;
}

export default function Themes({ handleChange, itemTag }: IThemesProps):JSX.Element {
  const { data } = useAppSelector((state) => state.message);

  return (
    <Box sx={{ minWidth: 50, margin: "15px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Theme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemTag}
          label="Theme"
          onChange={handleChange}
        >
          <MenuItem value={""}>all themes</MenuItem>
          {data &&
            data?.themes.map((item) => {
              return (
                <MenuItem value={item} key={item}>
                  {item}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
}
