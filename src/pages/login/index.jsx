"use client";

import * as React from "react";
import "./login.scss";

import { Link, Grid, TextField, Button, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "@/components/layouts/layout";
import { useRouter } from "next/router";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignInSide() {
  const router = useRouter();
  async function HandleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  }

  // Later optimization
  // import Image from 'next/image'
  // <Image src="/images/login/background.jpg" fill={true} objectPosition="center" objectFit="cover"  style={imageStyle}/>

  const theme = createTheme({
    typography: {
      fontFamily: ["Rubik", "system-ui", "sans-serif"].join(","),
    },
    palette: {
      primary: {
        main: "#7f5af0",
      },
      neutral: {
        main: "#2cb67d",
        contrastText: "#fffffe",
      },
    },
  });

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className="login">
          <form className="login_form" onSubmit={HandleSubmit}>
            <Avatar sx={{ m: 1, bgcolor: "#7f5af0" }}>
              <AccountCircleIcon />
            </Avatar>
            <TextField
              className="input"
              margin="normal"
              required
              fullWidth
              color="neutral"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{
                sx: {
                  color: "#fffffe",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#7f5af0",
                },
              }}
            />
            {/* Textfield with a purple border */}
            <TextField
              className="input"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              color="neutral"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{
                sx: {
                  color: "#fffffe",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#7f5af0",
                },
              }}
            />
            <Button
              className="se_connecter"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#7f5af0" }}
            >
              login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className="link" href="#">
                  Forgot your password ?
                </Link>
              </Grid>
              <Grid item>
                <Link className="link" href="/signup">
                  {"You don’t have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </ThemeProvider>
    </Layout>
  );
}
