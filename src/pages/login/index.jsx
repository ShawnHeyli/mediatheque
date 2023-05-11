import * as React from "react";
import "./index.scss";

import { Link, Grid, TextField, Button, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function SignInSide() {
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  // Later optimization
  // import Image from 'next/image'
  // <Image src="/images/login/background.jpg" fill={true} objectPosition="center" objectFit="cover"  style={imageStyle}/>

  const theme = createTheme({
    typography: {
      fontFamily: ["Rubik", "system-ui", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="login">
        <div className="login_form">
          <Avatar sx={{ m: 1, bgcolor: "#7f5af0" }}>
            <AccountCircleIcon />
          </Avatar>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#7f5af0" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="#">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}
