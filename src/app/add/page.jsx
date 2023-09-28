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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function Add() {
  const [values, setValues] = useState({ name: "", document: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarBlob, setAvatarBlob] = useState("");
  const supabase = createClientComponentClient();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data: newAssociate, error: errorInsertAssociate } = await supabase
        .from("associates")
        .insert({
          name: values.name,
          document: values.document,
        })
        .select()
        .single();

      if (errorInsertAssociate) throw errorInsertAssociate;

      if (avatarFile) {
        const { error: errorUploadAvatar } = await supabase.storage
          .from("avatars")
          .upload(`${newAssociate.id}`, avatarFile, {
            upsert: true,
          });

        if (errorUploadAvatar) throw errorUploadAvatar;

        const {
          data: { publicUrl: avatarUrl },
        } = supabase.storage.from("avatars").getPublicUrl(`${newAssociate.id}`);

        const { error: errorUpdateAvatar } = await supabase
          .from("associates")
          .update({ avatar_url: avatarUrl })
          .eq("id", newAssociate.id);

        if (errorUpdateAvatar) throw errorUpdateAvatar;
      }

      alert("Associado adicionado com sucesso!");
      setValues({ name: "", document: "" });
      setAvatarFile(null);
      setAvatarBlob("");
    } catch (error) {
      console.log(error);
      alert(
        `Ocorreu um erro durante a inserção do associado: ${error.message}`
      );
    }
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
                <AvatarUpload
                  setAvatarFile={setAvatarFile}
                  avatarBlob={avatarBlob}
                  setAvatarBlob={setAvatarBlob}
                />
                <TextField
                  label="Nome"
                  name="name"
                  fullWidth
                  required
                  value={values.name}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      name: event.target.value.toUpperCase(),
                    })
                  }
                />
                <TextField
                  label="CPF"
                  name="document"
                  fullWidth
                  required
                  value={values.document}
                  onChange={(event) =>
                    //regex CPF 000.000.000-00
                    {
                      if (
                        event.target.value.length <= 14 &&
                        /^[0-9.-]*$/.test(event.target.value)
                      ) {
                        setValues({
                          ...values,
                          document: event.target.value.replace(
                            /(\d{3})(\d{3})(\d{3})(\d{2})/,
                            "$1.$2.$3-$4"
                          ),
                        });
                      }
                    }
                  }
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
