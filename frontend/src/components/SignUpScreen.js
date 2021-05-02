import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Spinner from "./controls/Spinner";
import { register } from "../actions/userAction";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";

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
    height: "75vh",
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

const SignUpScreen = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState(() => "");
  const [userName, setUserName] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [contactNo, setContactNo] = useState(() => "");
  const [confirmPassword, setConfirmPassword] = useState(() => "");
  const [role, setRole] = useState(() => "");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, userName, password, email, contactNo, 0));
    }
  };

  const handleReset = () => {
    setName(() => "");
    setUserName(() => "");
    setEmail(() => "");
    setPassword(() => "");
    setContactNo(() => "");
    setConfirmPassword(() => "");
    setRole(() => "");
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          top: "10%",
          transform: "translateY(+10%)",
        }}
      >
        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item>
              <form onSubmit={submitHandler}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      Tagline Traders Signup{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Spinner />}
                  </Grid>

                  <Grid item xs={12}>
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
                      align="center"
                      placeholder="Name"
                      variant="outlined"
                      size="small"
                      name="name"
                      fullWidth
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      value={name}
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
                    <TextField
                      className={classes.inputText}
                      placeholder="Confirm Password"
                      variant="outlined"
                      size="small"
                      name="confirmPassword"
                      fullWidth
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      value={confirmPassword}
                      InputProps={{
                        classes: { input: classes.input },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.inputText}
                      placeholder="Email"
                      variant="outlined"
                      size="small"
                      name="email"
                      fullWidth
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      value={email}
                      InputProps={{
                        classes: { input: classes.input },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.inputText}
                      placeholder="Contact No"
                      variant="outlined"
                      size="small"
                      name="contactNo"
                      fullWidth
                      onChange={(e) => setContactNo(e.target.value)}
                      type="text"
                      value={contactNo}
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
                          onClick={submitHandler}
                        >
                          Save
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
                          onClick={handleReset}
                        >
                          Reset
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

export default SignUpScreen;
