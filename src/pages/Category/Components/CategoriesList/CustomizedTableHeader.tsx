import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Category, Order } from "../../util";
interface HeaderProps {
  order: Order;
  orderBy: keyof Category;
  onSort: (event: React.MouseEvent<unknown>, property: keyof Category) => void;
}
export const CustomizedTableHeader: React.FunctionComponent<HeaderProps> = (
  props
) => {
  const { order, orderBy, onSort } = props;
  const createSortHandler = (property: keyof Category) => (
    event: React.MouseEvent<unknown>
  ) => {
    onSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" key="name">
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
          >
            Category Name
          </TableSortLabel>
        </TableCell>

        <TableCell align="left" key="date">
          <TableSortLabel
            active={orderBy === "date"}
            direction={orderBy === "date" ? order : "asc"}
            onClick={createSortHandler("date")}
          >
            Created At
          </TableSortLabel>
        </TableCell>

        <TableCell align="left" key="action">
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
