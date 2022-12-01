import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Field } from "../Components/Field";
import CircularProgress from "@mui/material/CircularProgress";
import { authUser } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../hook";

export type FormInputs = {
  userName: string;
};

export default function AuthPage() {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      userName: "",
    },
  });
  const onSubmit = (data: FormInputs) => {
    dispatch(authUser(data.userName));
  };

  return (
    <Grid
      className="body-page"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          maxHeight: "300px",
          width: "40%",
          padding: "15px 25px",
          boxSizing: "border-box",
          marginTop: "150px",
          backgroundColor: "#f0f8ff",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Field
            label="User Name"
            id="userName"
            register={{
              ...register("userName", {
                required: "Required Field",
                maxLength: {
                  value: 30,
                  message: "max 30 symbols",
                },
                minLength: {
                  value: 1,
                  message: "min 4 symbols",
                },
              }),
            }}
            error={!!errors?.userName}
            helperText={errors?.userName && errors.userName.message}
          />
          {status !== "loading" && (
            <Button
              type="submit"
              color="info"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Sign In
            </Button>
          )}
          {status === "loading" && <CircularProgress />}
        </Box>
      </Paper>
    </Grid>
  );
}
