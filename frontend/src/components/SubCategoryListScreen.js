import React, { useEffect, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardBody from "./Card/CardBody.js";
import { Table, Row, Col, Spinner } from "react-bootstrap";
import {
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";
import Message from "../components/Message";

import { Paper, IconButton } from "@material-ui/core";
import { listCategories } from "../actions/categoryAction";
import {
  listSubCategories,
  listSubCategoriesByCategoryId,
} from "../actions/subCategoryAction";
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

const SubCategoryListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [categorySelected, setCategorySelected] = useState(() => "");
  const dispatch = useDispatch();

  const handleChangeCategory = (e) => {
    console.log("Category Changed  " + e.target.value);
    setCategorySelected(() => e.target.value);
  };
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listSubCategoriesByCategoryId(categorySelected));
  }, [dispatch, categorySelected]);

  const subCategoriesByCategory = useSelector(
    (state) => state.subCategoryListByCategory
  );
  let cats;
  if (categories) {
    console.log(categories);
    cats = categories.categories;
  }

  const { subcategories } = subCategoriesByCategory;
  console.log(subcategories);

  let renderCategoriesOptions = "";
  if (cats && cats.length > 0) {
    renderCategoriesOptions = cats.map((eachCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachCategory._id}>
          {eachCategory.name}
        </MenuItem>
      );
    });
  }

  const createHandler = (category) => {
    history.push("/admin/subcategories/new");
  };
  let renderContent = "";
  if (subcategories) {
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
          {subcategories.map((eachsubcat) => (
            <tr key={eachsubcat._id}>
              <td>{eachsubcat._id}</td>
              <td>{eachsubcat.name}</td>
              <td>{eachsubcat.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return (
    <Fragment>
      {loading && <Spinner />}
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
              onClick={createHandler}
            >
              CREATE
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <Grid item xs={3}>
                <Typography
                  variant="body1"
                  style={{
                    alignItems: "right",
                    justify: "right",
                    marginLeft: "5rem",
                  }}
                >
                  Category{" "}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Select
                  value={categorySelected}
                  onChange={handleChangeCategory}
                  placeholder="Category"
                  style={{ width: "10rem" }}
                >
                  {/* {renderCategories} */}
                  {renderCategoriesOptions}
                </Select>
              </Grid>
              <Grid item xs={3}></Grid>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sub Categories </h4>
              </CardHeader>
              <CardBody>{renderContent ? renderContent : ""}</CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </Fragment>
  );
};

export default SubCategoryListScreen;
