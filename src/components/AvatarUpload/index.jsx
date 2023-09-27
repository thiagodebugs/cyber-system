"use client";
import { Avatar, ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 128,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 128,
});

export default function AvatarUpload() {
  const [avatarBlob, setAvatarBlob] = useState("");
  return (
    <>
      <ButtonBase
        component="label"
        sx={{
          width: 128,
          height: 128,
          position: "relative",
          borderRadius: "5px",
          "&:hover": {
            "&::after": {
              content: '"Alterar foto"',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "5px",
            },
          },
        }}
      >
        <Avatar
          alt="Perfil"
          variant="rounded"
          src={avatarBlob}
          sx={{ width: 128, height: 128 }}
        />
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files[0];
            const blob = window.URL.createObjectURL(file);
            setAvatarBlob(blob);
          }}
        />
      </ButtonBase>
    </>
  );
}
