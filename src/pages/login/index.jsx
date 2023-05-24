import * as React from "react";
import "./index.scss";

import { Link, Grid, TextField, Button, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "@/components/layouts/layout";
import { useRouter } from "next/router";

export default function SignInSide() {
  const router = useRouter();
  async function HandleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // TODO change mockup
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    res.ok ? router.push("/") : alert(json.error);
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
