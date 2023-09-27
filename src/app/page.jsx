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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      router.push("/home");
      setLoading(true);
    } catch (error) {
      alert(error.message);
      setValues({ email: "", password: "" });
      setLoading(false);
    }
  };

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
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box>
          <Image
            src="https://cyber-system.vercel.app/img/cyber.png"
            alt="logo"
            width={150}
            height={150}
          />
        </Box>
        {/* Form Login */}
        <Container
          component="form"
          maxWidth="xs"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            label="E-mail"
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
