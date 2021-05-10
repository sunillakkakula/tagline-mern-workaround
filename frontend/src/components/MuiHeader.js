import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ZipCodeTracker from "./ZipCodeTracker";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import logo from "../assets/images/logo.jpg";
import { Link, useHistory } from "react-router-dom";
import LoginScreen from "../components/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";
import { FormControl, Select } from "@material-ui/core";
import ShoppingCartCountScreen from "./ShoppingCartCountScreen";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    fontSize: "20px",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontStyle: "italic",

    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appTitle: {
    fontSize: "1.75rem",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  loginBtn: {
    color: "#2874f0",
    fontWeight: "500",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "2px",
    height: "32px",
    padding: "5px 40px",
    border: "1px solid #dbdbdb",
  },
}));
const MuiHeader = () => {
  const history = useHistory();
  console.log(history);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Tagline Traders</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo[0].name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo[0].isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default MuiHeader;
