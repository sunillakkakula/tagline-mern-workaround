import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Spinner from "../components/controls/Spinner";
import { login } from "../actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccountCircleOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 2),
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    height: "45vh",
    width: "60vh",
  },
  inputText: {
    margin: "auto",
    padding: "1rem",
    alignContent: "center",
  },

  input: {
    "&::placeholder": {
      color: "gray",
      fontSize: "0.85rem",
      fontWeight: 500,
      fontFamily: "Roboto",
    },
    color: "gray", // if you also want to change the color of the input, this is the prop you'd use
  },
}));

const LoginScreen = ({ location, history }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
  };
  const handleSignUp = (e) => {
    console.log("Clicked Sign Up");
    e.preventDefault();
    history.push("/signup");
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          top: "50%",
          transform: "translateY(+50%)",
        }}
      >
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <form onSubmit={submitHandler}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      Tagline Traders Login{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Spinner />}
                  </Grid>

                  <Grid item xs={12}>
                    {/* <FormControl className={classes.margin}>
                      <InputLabel htmlFor="input-with-icon-adornment"></InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          <InputAdornment position="start">
                            <AccountCircleOutlined />
                          </InputAdornment>
                        }
                      />
                    </FormControl> */}
                    <TextField
                      className={classes.inputText}
                      align="center"
                      placeholder="User Name"
                      variant="outlined"
                      size="small"
                      name="userName"
                      fullWidth
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      value={userName}
                      InputProps={{
                        classes: { input: classes.input },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.inputText}
                      placeholder="Password"
                      variant="outlined"
                      size="small"
                      name="password"
                      fullWidth
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      InputProps={{
                        classes: { input: classes.input },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justify="center" spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          style={{
                            marginLeft: "0.75rem",
                            align: "center",
                            width: "9rem",
                          }}
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                          // onClick={submitHandler}
                        >
                          Sign In
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          style={{
                            marginRight: "0.75rem",
                            align: "center",
                            width: "9rem",
                          }}
                          size="small"
                          variant="contained"
                          type="submit"
                          color="primary"
                          onClick={handleSignUp}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
