import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import { WithStyles } from "@material-ui/core/styles";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "@reach/router";
import Background from "./whiteBackground.png";
import Header from "./components/Header/Header";
const styles = createStyles({
  "@global": {
    body: {
      fontFamily: "lato",
      backgroundColor: "white",
      backgroundImage: `url(${Background})`,
      height: "100%",
    },
  },
});
const MainPage: React.FunctionComponent<
  WithStyles<typeof styles> & RouteComponentProps
> = (props) => {
  const token = localStorage.getItem("LoggedIn");
  useEffect(() => {
    if (token !== "true") navigate("/");
  });
  return <Header />;
};
export default withStyles(styles)(MainPage);
