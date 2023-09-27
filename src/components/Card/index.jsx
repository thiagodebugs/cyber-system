import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";

export default function MyCard({ name, document, avatar_url }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: { xs: "150px" },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={avatar_url}
        alt="Foto de perfil"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ maxWidth: "300px" }}>
          <Typography variant="h5" noWrap gutterBottom>
            {name}
          </Typography>
          <Typography color="text.secondary">{document}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button>Editar</Button>
        </CardActions>
      </Box>
    </Card>
  );
}
