import React, { useEffect, Fragment ,useState} from "react";
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
import Dialog from '@material-ui/core/Dialog'
import ConfirmDialog from './ConfirmDialog'
import DialogContent from '@material-ui/core/DialogContent'
import { updateCategory ,deleteCategory,listCategories} from "../actions/categoryAction";
import {
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
import { CATEGORY_UPDATE_RESET } from "../constants/categoryConstants";
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
  
  const [open, setOpen] = useState(() => false);
  const [confirmOpen, setConfirmOpen] = useState(() => false);
  const [filteredCat,setFilteredCat]  = useState(()=>{});
  const [action,setAction]  = useState(()=>{});

  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const catgs = categories.categories;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { success_update } = categoryUpdate;
  
  useEffect(() => {
    console.log("useEffect Getting Called CategoryListScreen")
    if(success_update ){
      setAction("");
      dispatch({ type: CATEGORY_UPDATE_RESET })
      dispatch(listCategories());

    }
    else {
        dispatch(listCategories());
        setAction("");
    }
   
  }, [dispatch, history, success_update]);

  const createCategoryHandler = (category) => {
    history.push("/admin/category/new");
  };

  const nameChangeHandler = (nm)=>{
    setFilteredCat({...filteredCat,name:nm})
    console.log(filteredCat)
  }
  
  const descChangeHandler = (dsc)=>{
    setFilteredCat({...filteredCat,description:dsc})
    console.log(filteredCat)
  }

  const handleEdit = (catg) => {
    setOpen(true)
    console.log("ID SELECTED : "+catg._id)
    setFilteredCat(catg);
    setAction("edit");
  }

  const handleDelete = (catg) => {
    console.log("handleDelete Exec..."+catg._id)
    setAction("delete");
    setConfirmOpen(true)
    console.log("ID SELECTED : "+catg._id)
  }

  const submitHandler=()=>{
    console.log("EXEC submitHandler")
    if(action==="edit"){
    console.log(filteredCat)
    dispatch(updateCategory(filteredCat._id, filteredCat.name, filteredCat.description));
    setOpen(false);
    setFilteredCat({})
    }else if(action==="delete"){
      console.log(filteredCat)
    dispatch(deleteCategory(filteredCat._id));
    setOpen(false);
    }
  }

 

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
            <th>
              <Typography className={classes.cardTitleGreen} align="center">
                Action
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {catgs.map((ec) => (
            <tr key={ec._id}>
              <td>{ec._id}</td>
              <td>{ec.name}</td>
              <td>{ec.description}</td>
              <td>
                <EditRoundedIcon
                  style={{ color: "green" }}
                  onClick={() => handleEdit(ec)}
                />
                <DeleteOutlineIcon
                  style={{ color: "red" }}
                  onClick={() =>handleDelete(ec)}
                />
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
        <ConfirmDialog
    title="Delete Category ?"
    open={confirmOpen}
    setOpen={setConfirmOpen}
    onConfirm={()=>console.log("...DELETING")}
  >
    Are you sure you want to delete ?
  </ConfirmDialog>
        <Dialog open={open} onClose={()=>setOpen(false)}>
            <DialogContent>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Category </h4>
                </CardHeader>
                <CardBody>
                  <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={1}
                          alignItems="center"
                          justify="center"
                        >
                          <Grid item xs={6}>
                            <TextField
                              className={classes.inputText}
                              placeholder="Name"
                              variant="outlined"
                              name="name"
                              onChange={(e)=>nameChangeHandler(e.target.value)}
                              type="text"
                              size="small"
                              value={filteredCat && filteredCat.name  ?filteredCat.name:""}
                              fullWidth
                              InputProps={{
                                classes: { input: classes.input },
                              }}
                            />
                          </Grid>

                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item xs={6}>
                              <TextField
                                className={classes.inputText}
                                placeholder="Description"
                                variant="outlined"
                                name="description"
                                id="description"
                                onChange={(e)=>descChangeHandler(e.target.value)}
                                type="text"
                                size="small"
                                value={filteredCat && filteredCat.description  ?filteredCat.description:""}
                                fullWidth
                                InputProps={{
                                  classes: { input: classes.input },
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={1}
                            alignItems="center"
                            justify="center"
                          >
                            <Grid item xs={5} justify="center"></Grid>
                            <Grid item xs={2} justify="center">
                              <Button
                                size="small"
                                variant="contained"
                                type="submit"
                                color="primary"
                              >
                                Update
                              </Button>
                            </Grid>
                            <Grid item xs={5} justify="center"></Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
            </DialogContent>
        </Dialog>
      </GridContainer>
    </Fragment>
  );
};

export default CategoryListScreen;
