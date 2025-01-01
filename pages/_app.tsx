import Layout from "@/src/components/layout";
import "@/styles/globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define the routes where Layout (header/footer) is not needed
  const noLayoutRoutes = [
    "/",
    "/register",
    "/forgotpassword",
    "/resetpassword",
    "/changepassword",
  ];

  const shouldUseLayout = !noLayoutRoutes.includes(router.pathname);

  const darkTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#8257dc",
      },
      secondary: {
        main: "#f97316",
      },
      background: {
        default:"#dee0e0"
      },
      text: {
        primary: "rgb(76 78 100 / 87%) ",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {shouldUseLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}
