import * as React from "react";
import "./index.scss";

import { Link, Grid, TextField, Button, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "@/components/layouts/layout";

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
    palette: {
      primary: {
        main: '#7f5af0',
      },
      neutral: {
        main: '#2cb67d',
        contrastText: '#fffffe',
      },
    },
  });
  

  return (
    <Layout>
    <ThemeProvider theme={theme}>
      <div className="login">
        <div className="login_form">
          <Avatar sx={{ m: 1, bgcolor: "#7f5af0" }}>
            <AccountCircleIcon />
          </Avatar>
          <TextField className="input"
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
                color: '#fffffe',
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#7f5af0',
              },
            }}
          />
          <TextField className="input"
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
                color: '#fffffe',
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#7f5af0',
              },
            }}
          />
          <Button className="se_connecter"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#7f5af0" }}
          >
            se connecter
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className="link" href="#">Mot de passe oublié ?</Link>
            </Grid>
            <Grid item>
              <Link className="link" href="#inscription">{"Vous n'avez pas de compte ? Inscrivez vous"}</Link>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
    </Layout>
  );
}
