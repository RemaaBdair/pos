import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  withStyles,
  createStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
interface Props {
  type: string;
  labelName: string;
  classes: {
    root: string;
    notchedOutline: string;
  };
}
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1861ab",
    },
  },
});
const styles = createStyles({
  root: {
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: "#1861ab",
      borderWidth: 2,
    },
  },
  notchedOutline: {},
  disabled: {},
  focused: {},
  error: {},
});
const HigherOrderComponent: FunctionComponent<Props> = (props) => {
  const { classes, labelName, type } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField
        id="outlined-basic"
        type={type}
        label={labelName}
        color="primary"
        variant="outlined"
        InputProps={{
          classes: {
            root: classes.root,
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
    </ThemeProvider>
  );
};
export const MyTextField = withStyles(styles)(HigherOrderComponent);
