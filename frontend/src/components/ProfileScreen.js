import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { listMyOrders } from "../actions/orderAction";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { Button, Divider, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  imageFrame: {
    boxShadow: `0 5px 12px 0 ${theme.palette.cardShadow}`,
    borderRadius: theme.spacing(1),
  },
}));

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error, user } = userInfo;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  const classes = useStyles();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userInfo.id));
        // dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.emailId);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const updateProfileHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: user.id, name, email, password, contactNo })
      );
    }
  };
  // const updateProfileHandler = (e) => {
  //   console.log("updating Profile..");
  //   // dispatch()
  // };
  return (
    <div>
      <Grid container spacing={1}>
        {/* Profile Grid */}
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h3>Users Profile</h3>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} data-aos="fade-up">
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Name"
                      label="Name"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      value={name}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} data-aos="fade-up">
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Password"
                      label="Password"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      value={password}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} data-aos="fade-up">
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Confirm Password"
                      label="Confirm Password"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="text"
                      value={confirmPassword}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1} data-aos="fade-up">
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Contact No"
                      label="Contact No"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setContactNo(e.target.value)}
                      type="text"
                      value={contactNo}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} data-aos="fade-up">
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Email Id"
                      label="Email Id"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      value={email}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  align="center"
                  size="small"
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={updateProfileHandler}
                >
                  Update Profile
                </Button>
              </Grid>
              {/* <button onClick={() => history.push("/")}>Back to Groceries</button> */}
            </Grid>
          </Paper>
        </Grid>
        {/* Orders Grid */}
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h3>Previous Orders</h3>
                <Divider />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProfileScreen;
