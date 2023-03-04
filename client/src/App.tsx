import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import Auth from "./components/auth/Auth.component";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./components/welcome/Welcome.component";
import { theme } from "./theme";

const App = () => {
  const client = new QueryClient();
  const { classes } = useStyles();
  const [user, setUser] = useState("");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Auth setUser={setUser} />} />
        <Route element={<ProtectedRoute user={user} setUser={setUser} />}>
          <Route path="/welcome" element={<Welcome setUser={setUser} />} />
        </Route>
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <Box className={classes.root}>
          <RouterProvider router={router} />
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
export default App;

const useStyles = makeStyles()(() => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
}));
