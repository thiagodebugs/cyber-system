"use client";

import { Card, Navbar, Search } from "@/components";
import { Box, Fade, Grid, LinearProgress } from "@mui/material";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [associates, setAssociates] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    featchData();
  }, []);

  const featchData = async () => {
    const { data, error } = await supabase.from("associates").select();

    if (error) throw error;

    if (data) {
      setAssociates(data);
      setLoading(false);
    } else {
      setAssociates([]);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filter = dataMock.filter((item) => {
      return (
        item.name.toLowerCase().includes(value) || item.document.includes(value)
      );
    });
    setData(filter);
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
      <Navbar option="home">
        <Box sx={{ width: "100%", marginBottom: "15px" }}>
          <Search handleSearch={handleSearch} />
        </Box>
        <Grid container spacing={2}>
          {associates?.map((associate, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                name={associate.name}
                document={associate.document}
                avatar_url={associate.avatar_url}
              />
            </Grid>
          ))}
        </Grid>
      </Navbar>
    </>
  );
}
