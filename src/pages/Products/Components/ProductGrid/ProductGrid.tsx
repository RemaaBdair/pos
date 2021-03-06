import React, { useState, useEffect } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import ProductsList from "../ProductsList/ProductsList";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import FilterGrid from "../../../../Components/FilterGrid/FilterGrid";
import ProductFormDialog from "../ProductFormDialog/ProductFormDialog";
import { styles } from "./styles";
import { Product, filterData } from "../../util";
import { fetchProducts } from "../../api";
const ProductGrid: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmitDialog = () => {
    handleCloseDialog();
    onFetchProducts();
  };
  useEffect(() => {
    fetchProducts().then((res) => setProductsData(res));
  }, []);
  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  const [startDate, setSelectedStartDate] = React.useState<Date | null>(null);
  const [endDate, setSelectedEndDate] = React.useState<Date | null>(null);
  const handleInitDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
    if (!date) onFetchProducts(); //on Clear date field
  };
  const handleEndDateChange = (date: Date | null) => {
    setSelectedEndDate(date);
    if (!date) onFetchProducts();
  };
  const onFetchProducts = () => {
    fetchProducts().then((res) => setProductsData(res));
  };
  const applyFilter = async () => {
    const data = await fetchProducts();
    const filteredData = filterData(
      [
        {
          option: "more than or equal",
          value: startDate,
          key: "expirationDate",
        },
        {
          option: "less than or equal",
          value: endDate,
          key: "expirationDate",
        },
      ],
      data
    );
    setProductsData(filteredData);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} justify="flex-end" container>
        <FilterGrid
          startDate={startDate}
          endDate={endDate}
          onInitDateChange={handleInitDateChange}
          onEndDateChange={handleEndDateChange}
          onClick={applyFilter}
        />
      </Grid>
      <Grid item xs={6}>
        <MyButton
          onClick={() => setOpenDialog(true)}
          type="submit"
          variant="contained"
          fullWidth={false}
        >
          Add Product
        </MyButton>
        <ProductFormDialog
          openDialog={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitDialog}
        />
      </Grid>
      <Grid item xs={6} justify="flex-end" container>
        <MyTextField
          fullWidth={false}
          labelName="Search"
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Grid>
      <Grid item xs={12} justify="center" container>
        <ProductsList
          searchText={searchText}
          productsData={productsData}
          onFetchProducts={onFetchProducts}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(ProductGrid);
