"use client";

import {
  Box,
  Button,
  Container,
  Fade,
  LinearProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import logo from "@/images/logo_1080.png";

export default function Home() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "2px",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <Fade in={loading}>
          <LinearProgress />
        </Fade>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: { xs: "90vh", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box>
          <Image src={logo} alt="logo" width={200} height={200} />
        </Box>
        {/* Form Login */}
        <Container
          component="form"
          action="/auth/signin"
          method="post"
          maxWidth="xs"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="E-mail"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            value={values.email}
            onChange={(event) =>
              setValues({ ...values, email: event.target.value })
            }
          />
          <TextField
            label="Senha"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="password"
            value={values.password}
            onChange={(event) =>
              setValues({ ...values, password: event.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setLoading(true)}
          >
            Entrar
          </Button>
          <Link href="#" component={NextLink} variant="body2">
            Esqueceu a senha?
          </Link>
        </Container>
        {/* Footer */}
        <Box>
          <Typography variant="body2" color="textSecondary" align="center">
            Associação Atlética Acadêmica Cyber
          </Typography>
        </Box>
      </Box>
    </>
  );
}
