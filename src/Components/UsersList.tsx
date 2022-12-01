import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAppDispatch, useAppSelector } from "../hook";
import { getUsers } from "../redux/slices/userSlice";
import { IUserData } from "../types";

export default function UsersList({ changeUser, user }: any) {
  const dispatch = useAppDispatch();
  const { userName, id } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.users);
  const messages = useAppSelector((state) => state.message.data);

  useEffect(() => {
    if (userName && id) {
      dispatch(getUsers({ userName, id }));
    }
  }, [dispatch, userName, id]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
          User List
        </Typography>
        <List dense={false}>
          {data &&
            data.map((item: IUserData) => {
              return (
                <ListItem
                  onClick={() => changeUser(item.userName)}
                  key={item.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      {
                        item.userName!==userName &&
                        <Badge color="secondary" badgeContent={messages && messages.messages.filter((element) => element.from === item.userName && !element.status).length}>
                        <MailOutlineIcon />
                      </Badge>
                      }
                      {
                        item.userName===userName &&
                        <Badge color="secondary" badgeContent={messages && messages.messages.filter((element) => element.to === userName && !element.status).length}>
                        <MailOutlineIcon />
                      </Badge>
                      }
                    </IconButton>
                  }
                  style={{
                    backgroundColor:
                      user && item.userName === user
                        ? "#f0f8ff"
                        : !user && item.userName === userName
                        ? "#f0f8ff"
                        : "",
                    cursor: "pointer",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ width: 36, height: 36 }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.userName} />
                </ListItem>
              );
            })}
        </List>
      </Grid>
    </Grid>
  );
}
