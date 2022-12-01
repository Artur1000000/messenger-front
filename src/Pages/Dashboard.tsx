import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UsersList from "../Components/UsersList";
import Themes from "../Components/Themes";
import Content from "../Components/Content";
import { SelectChangeEvent } from "@mui/material/Select";
import SendBlock from "../Components/SendBlock";
import { useAppSelector } from "../hook";


export default function DashboardPage() {
  const { userName } = useAppSelector((state) => state.auth);

  const [user, setUser] = useState<string>("" || userName);
  const [itemTag, setItemTag] = useState<string>("");
  const changeUser = (prop: string) => {
    if (prop !== user) {
      setUser(prop);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setItemTag(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <Grid
          item
          xs={2}
          style={{
            height: "100%",
            overflowY: "auto",
          }}
        >
          <UsersList changeUser={changeUser} user={user} />
        </Grid>
        <Grid
          item
          xs={7}
          style={{
            height: "100%",
            boxShadow: "1px 0 0 #bfbfbf",
            backgroundColor: "#f0f8ff",
            display: "flex",
            alignItems:"center",
            justifyContent:"space-between",
            flexDirection: "column",
          }}
        >
          <Content user={user} itemTag={itemTag} />
          <SendBlock user={user}/>
        </Grid>
        <Grid item xs={3} style={{ height: "100%", overflowY: "auto" }}>
          <Themes handleChange={handleChange} itemTag={itemTag} />
        </Grid>
      </Grid>
    </Box>
  );
}
