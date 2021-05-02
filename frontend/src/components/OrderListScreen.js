import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { Link } from "@material-ui/core";
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
// import Table from "../components/Table/Table.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";
import { Table, Row, Col } from "react-bootstrap";
import Paginate from "../components/Paginate";
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

const OrderListScreen = ({ history, match }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleOrderItemDetails = (id) => {
    history.push(`/order/${id}`);
  };

  let renderOrdersContent = "";
  if (orders) {
    // console.log("Orders : " + orders);
    renderOrdersContent = (
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Order Id
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                User Id
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                User Name
              </Typography>
            </th>

            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Total Price
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Tax Price
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Shipping Price
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Order Date
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Delivery Date
              </Typography>
            </th>
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Details
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            // co nsole.log(order)
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{userInfo.name}</td>

              <td>{order.itemsPrice}</td>
              <td>{order.taxPrice}</td>
              <td>{order.shippingPrice}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>
                <ListAltIcon
                  style={{
                    color: "green",
                    // align: "center",
                    // alignContent: "center",
                    // alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleOrderItemDetails(order.id)}
                />{" "}
              </td>
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
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>orders </h4>
            </CardHeader>
            <CardBody>
              {renderOrdersContent ? renderOrdersContent : ""}
              {/* <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>
                      <Typography
                        className={classes.cardTitleGreen}
                        align="center"
                      >
                        Name
                      </Typography>
                    </th>
                    <th>
                      <Typography
                        className={classes.cardTitleGreen}
                        align="center"
                      >
                        Description
                      </Typography>
                    </th>
                    <th>
                      <Typography
                        className={classes.cardTitleGreen}
                        align="center"
                      >
                        Price
                      </Typography>
                    </th>
                    <th>
                      <Typography
                        className={classes.cardTitleGreen}
                        align="center"
                      >
                        Brand
                      </Typography>
                    </th>
                    <th>
                      <Typography
                        className={classes.cardTitleGreen}
                        align="center"
                      >
                        Action
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    // co nsole.log(order)
                    <tr key={order.id}>
                      <td>{order.name}</td>
                      <td>{order.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table> */}
              {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

export default OrderListScreen;
