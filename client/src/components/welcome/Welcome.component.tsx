import {
  Button,
  List,
  Typography,
  ListItem,
  Container,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/user";
import { useStyles } from "./Welcome.styles";

const Welcome = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const { data: allUsers } = useQuery(["users"], getUsers, {
    enabled: isQueryEnabled,
  });

  const handleLogout = () => {
    setUser("");
    navigate("/");
  };

  return (
    <Container className={classes.root}>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          Welcome to our site. You can now make requests!
        </Typography>
        <Button onClick={() => setIsQueryEnabled(true)} variant="contained">
          get all users
        </Button>
        <Button variant="text" onClick={handleLogout}>
          Log out
        </Button>
      </Box>
      <List className={classes.list}>
        {allUsers && allUsers.length > 0
          ? allUsers.map((user) => (
              <ListItem key={user.id} sx={{ width: "min-content" }}>
                {user.email}
              </ListItem>
            ))
          : null}
      </List>
    </Container>
  );
};
export default Welcome;
