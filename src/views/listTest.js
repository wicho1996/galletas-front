import * as React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  Grid,
  Collapse
} from "@mui/material";
import { Delete, Folder } from "@mui/icons-material";
import axiosSystem from "../utils/axiosSystem";

const routes = {
  getPages: axiosSystem("Login/getPaginas"),
};

//nkhnjkbnjkbjkkbkbkbjk//
function ListTest() {
  const [pages, setPages] = React.useState([1,2,3,4,5,6,7,8,9,10]);

  const getPages = () => {
    routes.getPages(
      (res) => {
        setPages(res);
        console.log(res);
      },
      { dat: "Hola" }
    );
  };

  React.useEffect(() => {
    // getPages();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <List>
            {pages.map((page) => {
              return (
                <Collapse key={`${page}${page}`} in={true} timeout="auto" unmountOnExit>
                  <ListItem
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
                      primary={page.nombrePagina}
                      secondary={"Secondary text"}
                    />
                  </ListItem>
                </Collapse>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}


export default ListTest;
