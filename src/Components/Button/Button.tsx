import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
export interface Props {
  type?: "submit" | "button";
  children: string;
  size?: "large" | "medium" | "small";
  disable?: boolean;
  fullWidth?: boolean;
  variant: "contained" | "text" | "outlined";
  component?: "span";
  onClick?: (e: React.SyntheticEvent) => void;
}
const button: React.FunctionComponent<Props & WithStyles<typeof styles>> = (
  props
) => {
  const {
    children,
    classes,
    onClick,
    size = "large",
    disable = false,
    fullWidth = true,
    component,
  } = props;
  return (
    <Button
      fullWidth={fullWidth}
      disabled={disable}
      variant={props.variant}
      size={size}
      type={props.type}
      className={classes.root}
      onClick={onClick}
      color="secondary"
      component={component ? "span" : "button"}
    >
      {children}
    </Button>
  );
};
export const MyButton = withStyles(styles)(button);
