"use client";

import { Navbar } from "@/components";
import {
  Toolbar,
  Typography,
  Paper,
  Stack,
  Button,
  Container,
} from "@mui/material";

export default function Add() {
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
          <Container component="form" onSubmit={handleSubmit}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined">Voltar</Button>
              <Button variant="outlined">Limpar</Button>
              <Button type="submit" variant="contained">
                Adicionar
              </Button>
            </Stack>
          </Container>
        </Paper>
      </Navbar>
    </>
  );
}
