import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Spinner from "./controls/Spinner";
import { Link } from "@material-ui/core";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
// import Table from "../components/Table/Table.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardBody from "./Card/CardBody.js";
import { Table, Row, Col } from "react-bootstrap";
import Paginate from "./Paginate";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { listOrders } from "../actions/orderAction";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
import { listCategories } from "../actions/categoryAction";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleGreen: {
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
  },
};

const CategoryListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  console.log(categories.categories);
  const catgs = categories.categories;
  const createCategoryHandler = (category) => {
    history.push("/admin/category/new");
  };
  let renderContent = "";
  if (catgs) {
    renderContent = (
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                ID
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Name
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Decsription
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.categories.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Button
            style={{
              marginLeft: "0.75rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              align: "center",
              width: "9rem",
            }}
            size="small"
            variant="contained"
            type="submit"
            color="primary"
            onClick={createCategoryHandler}
          >
            New Category
          </Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Categories </h4>
            </CardHeader>
            <CardBody>{renderContent ? renderContent : ""}</CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

export default CategoryListScreen;
