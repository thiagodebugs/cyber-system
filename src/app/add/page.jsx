"use client";

import { AvatarUpload, Navbar } from "@/components";
import {
  Toolbar,
  Typography,
  Paper,
  Stack,
  Button,
  Container,
  Box,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function Add() {
  const [values, setValues] = useState({ name: "", document: "" });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value.toUpperCase(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <Navbar option="add">
        <Paper sx={{ width: "100%", pb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography variant="h6" component="div">
              Novo Associado
            </Typography>
          </Toolbar>
          <Container component="form" maxWidth="md" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <AvatarUpload />
                <TextField
                  label="Nome"
                  name="name"
                  fullWidth
                  required
                  value={values.name}
                  onChange={handleChange}
                />
                <TextField
                  label="CPF"
                  name="document"
                  fullWidth
                  required
                  value={values.document}
                  onChange={handleChange}
                />
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined">Voltar</Button>
                <Button variant="outlined">Limpar</Button>
                <Button type="submit" variant="contained">
                  Adicionar
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Paper>
      </Navbar>
    </>
  );
}
