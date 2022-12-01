import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { getMessages } from "../redux/slices/messageSlice";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "./Card";

interface IContentProps {
  user: string;
  itemTag: string;
}

export default function Content({ user, itemTag }: IContentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { userName, id } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.message);

  useEffect(() => {
    if (userName && id) {
      const interval = setInterval(() => {
        dispatch(getMessages({ userName, id }));
      }, 5000);
      return () => clearInterval(interval)
    }
  }, [dispatch, userName, id]);

  const scrollElement: any = useRef();
  useEffect(() => {
    scrollElement.current.scrollTop = scrollElement.current.scrollHeight;
    console.log(scrollElement);
  }, [data]);
  return (
    <div
      id="scrollContent"
      style={{
        maxHeight: "700px",
        minHeight: "300px",
        overflowY: "auto",
        width: "100%",
        boxSizing: "border-box",
        padding: "15px",
      }}
      ref={scrollElement}
    >
      <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div">
        {userName}
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
        style={{ width: "100%" }}
      >
        {data &&
          user !== userName &&
          data.messages
            .filter(
              (element) =>
                (element.from === user && element.to === userName) ||
                (element.from === userName && element.to === user)
            )
            .map((mess) => {
              return (
                <Grid item xs={8} key={mess._id}>
                  <Card
                    id={mess._id}
                    theme={mess.theme}
                    text={mess.text}
                    from={mess.from}
                    to={mess.to}
                    date={mess.createdAt}
                    user={user}
                    userName={userName}
                    status = {mess.status}
                    />
                </Grid>
              );
            })}
        {data &&
          user === userName &&
          data.messages
          .filter((element) => element.from===element.to || element.from !== user)
            .map((mess) => {
              if (itemTag.length && itemTag === mess.theme) {
                return (
                  <Grid item xs={8} key={mess._id}>
                    <Card
                      id={mess._id}
                      theme={mess.theme}
                      text={mess.text}
                      from={mess.from}
                      to={mess.to}
                      date={mess.createdAt}
                      user={user}
                      userName={userName}
                      status = {mess.status}
                    />
                  </Grid>
                );
              }
              if (!itemTag.length) {
                return (
                  <Grid item xs={8} key={mess._id}>
                    <Card
                      id={mess._id}
                      theme={mess.theme}
                      text={mess.text}
                      from={mess.from}
                      to={mess.to}
                      date={mess.createdAt}
                      user={user}
                      userName={userName}
                      status = {mess.status}
                    />
                  </Grid>
                );
              }
              return "";
            })}
      </Grid>
    </div>
  );
}
