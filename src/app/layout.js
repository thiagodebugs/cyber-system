import CssBaseline from "@mui/material/CssBaseline";

export const metadata = {
  title: "CyberSystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <CssBaseline />
      <body>{children}</body>
    </html>
  );
}
