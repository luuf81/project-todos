import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Container, Paper, Box, Fab, Dialog, Tooltip } from "@material-ui/core";
import styled from "styled-components";
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";

import { tasks } from "reducers/tasks";
import { TodoList } from "components/TodoList";
import { TodoInput } from "components/TodoInput";
import { Header } from "components/Header";
import theme from "./theme";

//not really needed for one, but add more here if you want to combine reducers
const reducer = combineReducers({ tasks: tasks.reducer });

const store = configureStore({ reducer });

//special syntax needed to override styling of MUI (&&)
const MyContainer = styled(Container)`
  && {
    padding: 0;
  }
`;

const MyFab = styled(Fab)`
  && {
    position: fixed;
    bottom: 20px;
    right: 30px;
  }
`;

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   }
// })

export const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MyContainer maxWidth="xs">
          <Header />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <TodoInput onClose={handleClose} />
          </Dialog>
          <TodoList />
          <Tooltip title='Add Todo'>
          <MyFab
            color="primary"
            aria-label="add"
            onClick={handleClickOpen}
          ></MyFab>
          </Tooltip>
        </MyContainer>
      </ThemeProvider>
    </Provider>
  );
};
