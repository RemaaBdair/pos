import React from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { addItem } from "../../../../actions";
import { State } from "../../../../reducers";
import { connect, ConnectedProps } from "react-redux";
import { styles } from "./styles";
import { Product, filterData } from "../../../Products/util";
import useSearch from "../../../../hooks/useSearch";
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props {
  searchText: string;
  categoryFilter: string | null;
}
const ItemsList: React.FunctionComponent<
  WithStyles<typeof styles> & Props & PropsFromRedux
> = (props) => {
  const { classes, searchText, categoryFilter, addItem, products } = props;
  const [result] = useSearch(products, searchText);
  const filteredProducts = React.useMemo(
    () =>
      filterData(
        [
          {
            option: "equals",
            value: categoryFilter,
            key: "category",
          },
        ],
        result
      ),
    [result, categoryFilter]
  );
  const handleClick = (product: Product) => {
    addItem(product);
    console.log("hi");
  };
  return (
    <Grid item xs={12} justify="flex-start" container>
      {filteredProducts.map((product) => {
        return (
          <Card className={classes.card} key={product.id + "productCard"}>
            <CardMedia
              key={product.id + "product"}
              component="img"
              alt={`${product.name}'s image`}
              classes={{ root: classes.image }}
              image={product.image}
              title={product.image}
              onClick={() => handleClick(product)}
            />

            <div className={classes.overlay} key={product.id}>
              {product.name}
            </div>
          </Card>
        );
      })}
    </Grid>
  );
};

const mapStateToProps = (state: State) => ({
  products: state.products,
});

const mapDispatchToProps = { addItem };

const connector = connect(mapStateToProps, mapDispatchToProps);
const WrappedComponent = connector(ItemsList);
export default withStyles(styles)(WrappedComponent);
