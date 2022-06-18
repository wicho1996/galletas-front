import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Grid,
} from "@mui/material";
import { Delete, Folder } from "@mui/icons-material";
import axios from "axios";

function ThemeContext() {
  const [dense] = React.useState(false);
  const [pages, setPages] = React.useState([]);

  const getPages = () => {
    return axios
      .get("http://localhost/ci-plantilla/Login/getPaginas")
      .then(function (res) {
        // handle success
        setPages(res.data);
        console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  React.useEffect(() => {
    getPages();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <List dense={dense}>
            {pages.map((page) => {
              return (
                <ListItem
                  key={page.id+page.nombre}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Folder />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={page.nombre}
                    secondary={"Secondary text"}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default ThemeContext;
