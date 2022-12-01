import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { writeMessage } from "../redux/slices/messageSlice";
import { useAppDispatch } from "../hook";

interface ICardProps {
  id: string;
  theme: string;
  text: string;
  from: string;
  to: string;
  user: string;
  userName: string;
  date: string;
  status: boolean;
}

export default function Card({
  id,
  theme,
  text,
  from,
  to,
  user,
  userName,
  date,
  status,
}: ICardProps): JSX.Element {
  const [state, setState] = useState(user !== userName ? true : false);
  const dispatch = useAppDispatch();
  const open = () => {
    if (user === userName) {
      setState((state) => !state);
    }
    if (!status) {
      dispatch(writeMessage([id]));
    }
  };
  console.log(state)
  return (
    <Paper>
      <Typography style={{ cursor: "pointer" }} onClick={() => open()}>
        # {theme}
      </Typography>
      <Accordion expanded={state}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ cursor: "auto" }}
        >
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: "0" }}>{from}</p>
            <p style={{ margin: "0" }}>{date}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text}</Typography>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}
