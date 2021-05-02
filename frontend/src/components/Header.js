import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { logout } from "../actions/userAction";
import ZipCodeTracker from "./ZipCodeTracker";
import logo from "../assets/images/logo.jpg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
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
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
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
  },
}));
function ElevationScroll(props) {
  const { children } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar disableGutters={true}>
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
            <Link to="/">
              <span className={classes.appTitle}>
                <b>
                  <i>
                    <h5>Tagline Traders</h5>
                  </i>
                </b>
              </span>
            </Link>
            <div className={classes.grow} />
            {/* IMPLEMENT GRID HERE TO ENSURE THE ELEMENBTS ARE PLACED ALIGNED CENTER AND HAVING SPACE IN BETWEEN -KSP */}
            <Grid container fluid>
              <Grid item xs={3}>
                {" "}
                <ZipCodeTracker />
              </Grid>
              <Grid item xs={3}>
                {" "}
              </Grid>
              <Grid item xs={3}>
                {userInfo ? (
                  <>
                    <Link to="/profile">
                      <div>{userInfo.name}</div>
                    </Link>
                    <Link to="/logout">
                      <div
                        onClick={logoutHandler}
                        style={{ marginLeft: "1.5em" }}
                      >
                        Logout
                      </div>
                    </Link>
                  </>
                ) : (
                  <div>
                    <Link to="/login">
                      <i className="fas fa-user" />
                    </Link>
                  </div>
                )}
              </Grid>
              <Grid item xs={3}>
                {" "}
                <Link to="/login">
                  <i className="fas fa-user" />
                </Link>
              </Grid>
            </Grid>
            <div style={{ marginLeft: "5em" }}>
              <ZipCodeTracker />
            </div>
            <Link to="/cart">
              <ShoppingCartIcon count="10" />
            </Link>
            {userInfo ? (
              <>
                <Link to="/profile">
                  <div style={{ marginRight: "1.5em" }}>{userInfo.name}</div>
                </Link>
                <Link to="/logout" style={{ marginRight: "1.5em" }}>
                  <div onClick={logoutHandler} style={{ marginLeft: "1.5em" }}>
                    Logout
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <i className="fas fa-user" />
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
