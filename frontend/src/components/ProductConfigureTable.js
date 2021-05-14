import React from "react";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
// import Table from "@material-ui/core/Table";
import { Table } from "react-bootstrap";
// import ttbody from "@material-ui/core/ttbody";
// import td from "@material-ui/core/td";
// import tr from "@material-ui/core/tr";
// import TableRowColumn from "@material-ui/core;
import TableHead from "@material-ui/core/TableHead";
// import EditIcon from "material-ui/svg-icons/image/edit";
import EditIcon from "@material-ui/icons/Edit";
// import DeleteOutlineIcon from "material-ui/svg-icons/action/delete";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// import DoneOutlineIcon from "material-ui/svg-icons/navigation/check";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";

const cardTitleGreen = {
  color: "#26A541",
  marginTop: "0px",
  minHeight: "auto",
  fontFamily: "Roboto",
  marginBottom: "3px",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: 500,
  textTransform: "capitalize",
  textAlign: "left",
  "& small": {
    color: "#777",
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1",
  },
};
const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing
) => {
  const currentlyEditing = editIdx === i;
  return (
    <tr key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <td key={`trc-${k}`}>
          {currentlyEditing ? (
            <TextField
              name={y.prop}
              onChange={(e) => handleChange(e, y.prop, i)}
              value={x[y.prop]}
            />
          ) : (
            x[y.prop]
          )}
        </td>
      ))}
      <td>
        {currentlyEditing ? (
          <DoneOutlineIcon onClick={() => stopEditing()} />
        ) : (
          <EditIcon onClick={() => startEditing(i)} />
        )}
      </td>
      <td>
        <DeleteOutlineIcon onClick={() => handleRemove(i)} />
      </td>
    </tr>
  );
};

const ProductConfigureTable = ({
  data,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
}) => (
  <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={cardTitleGreen}>List Configuration </h4>
        </CardHeader>
        <CardBody>
          <Table striped bordered hover responsive className="table-sm">
            <tbody>
              {data.map((x, i) =>
                row(
                  x,
                  i,
                  header,
                  handleRemove,
                  startEditing,
                  editIdx,
                  handleChange,
                  stopEditing
                )
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </GridItem>
  </GridContainer>
);

export default ProductConfigureTable;
