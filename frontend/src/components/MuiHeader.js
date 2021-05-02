import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import CustomizedBadges from "./CustomizedBadges";
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
  let [alreadyLoggedIn, setAlreadyLoggedIn] = useState(() => "false");
  const classes = useStyles();
  const [targetUrl, setTargetUrl] = React.useState(() => "");
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  alreadyLoggedIn = userInfo !== null ? true : false;
  console.log("alreadyLoggedIn : " + alreadyLoggedIn);
  let [loginLogoutBtnTitle, setLoginLogoutTitle] = useState("");
  let [loginLogoutBtnUrl, setLoginLogoutUrl] = useState("");

  useEffect(() => {
    if (userInfo && userInfo.name) {
      setLoginLogoutTitle("logout");
      setLoginLogoutUrl("/logout");
    } else {
      setLoginLogoutTitle("login");
      setLoginLogoutUrl("/login");
    }
    // loginLogoutBtnUrl = alreadyLoggedIn === true ? "/logout" : "/login";
    console.log(
      "loginBtnTitle : " +
        loginLogoutBtnTitle +
        " , loginLogoutBtnUrl :" +
        loginLogoutBtnUrl
    );
  }, [loginLogoutBtnTitle, loginLogoutBtnUrl, userInfo]);

  // let loginLogoutBtnTitle = alreadyLoggedIn === true ? "logout" : "login";
  // let loginLogoutBtnUrl = alreadyLoggedIn === true ? "/logout" : "/login";
  // console.log("loginBtnTitle : " + loginLogoutBtnTitle);
  const roleOfuserInfoExist = userInfo && userInfo.role ? true : false;

  const handleChange = (event) => {
    console.log("event.target.value : " + event.target.value);

    setTargetUrl(event.target.value);
    history.push("/admin/" + event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const handleLoginLogout = () => {
    loginLogoutBtnTitle = alreadyLoggedIn === true ? "logout" : "login";
    console.log("loginLogoutBtnTitle : " + loginLogoutBtnTitle);
    if (alreadyLoggedIn) {
      dispatch(logout());
      history.push("/login");
    }
  };
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCartItems = () => {
    console.log("Navigating to Cart Screen from the MUI Header Handler");
    history.push("/showCart");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile">
          <Typography variant="body1" color="primary">
            Profile
          </Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        {" "}
        <Typography variant="body1" color="primary">
          My account
        </Typography>
      </MenuItem>
    </Menu>
  );

  // userInfo !== null && userInfo.role !== null ? true : false;
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <img
              className="img-thumbnail"
              alt="Staples"
              src={logo}
              style={{
                height: "3.5rem",
                width: "3.5rem",
                marginRight: "5em",
              }}
            />
          </div>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            style={{ color: "white" }}
          >
            Tagline Traders Groceries
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <ZipCodeTracker />

            <Button
              onClick={handleLoginLogout}
              className={classes.loginBtn}
              value={loginLogoutBtnTitle}
              size="small"
              variant="contained"
              style={{
                color: "green",
                backgroundColor: "white",
                height: "2rem",
                margin: "0.5rem",
                alignContent: "center",
                verticalAlign: "baseline",
              }}
            >
              {loginLogoutBtnTitle}
            </Button>
            <ShoppingCartCountScreen />

            {roleOfuserInfoExist &&
              userInfo.role &&
              userInfo.role === "ROLE_USER" && (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  title={userInfo.userName}
                >
                  <AccountCircle />
                </IconButton>
              )}
            {roleOfuserInfoExist &&
              userInfo.role &&
              userInfo.role === "ROLE_ADMIN" && (
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    defaultValue={userInfo.name}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    color={classes.primary}
                    style={{
                      backgroundColor: "white",
                      padding: "0px 0px 0px 0px",
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={userInfo.name}>{userInfo.name}</MenuItem>
                    <MenuItem value="Users">users</MenuItem>
                    <MenuItem value="products">Products</MenuItem>
                    <MenuItem value="orderlist">Orders</MenuItem>
                  </Select>
                </FormControl>
              )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default MuiHeader;
