"use client";

import { Card, Navbar, Search } from "@/components";
import { Box, Grid } from "@mui/material";

import dataMock from "@/MOCK_DATA.json";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(dataMock);

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
      <Navbar option="home">
        <Box sx={{ width: "100%", marginBottom: "15px" }}>
          <Search handleSearch={handleSearch} />
        </Box>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card
                name={item.name}
                document={item.document}
                avatar_url={item.avatar_url}
              />
            </Grid>
          ))}
        </Grid>
      </Navbar>
    </>
  );
}
