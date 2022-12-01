import React, { useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../hook";
import { sendMessage } from "../redux/slices/messageSlice";

interface ISendBlockProps {
  user: string;
}
export default function SendBlock({ user }: ISendBlockProps) {
  const { userName } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.message);
  const [itemTag, setItemTag] = useState<string>("");
  const [writeTag, setWriteTag] = useState<string>("");
  const [textMessage, setTextMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const changeTag = (event: SelectChangeEvent) => {
    setItemTag(event.target.value);
  };
  const changeMessage = (prop: string) => {
    setTextMessage(prop);
  };
  const send = () => {
    dispatch(
      sendMessage({
        from: userName,
        to: user,
        theme: writeTag || itemTag,
        text: textMessage,
      })
    );
    setItemTag("");
    setWriteTag("");
    setTextMessage("");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background: "#f3f3f3",
        boxSizing: "border-box",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "5px",
        }}
      >
        <div style={{ width: "50%" }}>
          <FormControl fullWidth style={{ background: "#ffffff" }}>
            <InputLabel id="demo-simple-select-label">Theme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={itemTag}
              label="Theme"
              onChange={changeTag}
            >
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
        </div>
        <div style={{ width: "50%" }}>
          <TextField
            style={{ background: "#ffffff" }}
            fullWidth={true}
            value={writeTag}
            id="outlined-basic"
            label="New Theme"
            variant="outlined"
            onChange={(e) => setWriteTag(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <TextareaAutosize
        aria-label="minimum height"
        minRows={5}
        value={textMessage}
        onChange={(e) => {
          changeMessage(e.target.value);
        }}
        placeholder={`write message for ${user}`}
        style={{ width: "80%" }}
      />
      <br />
      <Button variant="contained" fullWidth={true} onClick={send}>
        Send
      </Button>
    </div>
  );
}
