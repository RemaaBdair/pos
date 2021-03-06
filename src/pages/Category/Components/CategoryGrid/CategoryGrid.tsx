import React, { useState, useEffect } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { RouteComponentProps } from "@reach/router";
import CategoriesList from "../CategoriesList/CategoriesList";
import { MyTextField } from "../../../../Components/TextField/TextField";
import { MyButton } from "../../../../Components/Button/Button";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import { styles } from "./styles";
import { Category } from "../../util";
import { fetchCategories } from "../../api";
import useEditDialog from "../../hooks/useEditDialog";
const CategoryGrid: React.FunctionComponent<
  WithStyles<typeof styles> & SvgIconProps & RouteComponentProps
> = (props) => {
  const { classes } = props;
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories().then((res) => setCategoryData(res));
  }, []);
  const [searchText, setSearchText] = useState("");
  const { editingName, setEditingName, handleEditSubmit } = useEditDialog();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingName("");
  };
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };
  const onFetchCategories = () => {
    fetchCategories().then((res) => setCategoryData(res));
  };
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <MyButton
          onClick={() => setOpenDialog(true)}
          type="submit"
          variant="contained"
          fullWidth={false}
        >
          Add Category
        </MyButton>

        <EditCategoryDialog
          openDialog={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleEditSubmit}
          onFetch={onFetchCategories}
          setName={setEditingName}
          name={editingName}
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
        <CategoriesList
          searchText={searchText}
          categoryData={categoryData}
          onFetchCategories={onFetchCategories}
        />
      </Grid>
    </Grid>
  );
};
export default withStyles(styles)(CategoryGrid);
