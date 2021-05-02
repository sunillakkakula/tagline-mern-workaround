import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Input, InputBase } from "@material-ui/core";
import GridItem from "./Grid/GridItem";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import CardBody from "./Card/CardBody";
import GridContainer from "./Grid/GridContainer";

const cardTitleGreen = {
  color: "#fff",
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
};

const input = {
  width: "25rem",
  fontSize: "0.85rem",
  fontWeight: 500,
  fontFamily: "Roboto",
  "&::placeholder": {
    color: "gray",
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "Roboto",
  },
  color: "gray", // if you also want to change the color of the input, this is the prop you'd use
};

export default class ProductConfigureForm extends React.Component {
  state = {
    orderType: "",
    orderTypeError: "",
    unitOfMessure: "",
    unitOfMessureError: "",
    unitPrice: "",
    unitPriceError: "",
    sellingPrice: "",
    sellingPriceError: "",
  };

  change = (e) => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      orderTypeError: "",
      unitOfMessureError: "",
      unitPriceError: "",
      sellingPriceError: "",
    };

    if (this.state.unitPrice.length < 5) {
      isError = true;
      errors.unitPriceError = "unitPrice needs to be atleast 5 characters long";
    }

    if (!this.state.sellingPrice) {
      isError = true;
      errors.sellingPriceError = "Requires valid sellingPrice";
    }

    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  onSubmit = (e) => {
    console.log("Clicked Save");
    e.preventDefault();
    // const err = this.validate();
    // if (!err) {
    this.props.onSubmit(this.state);
    // clear form
    this.setState({
      orderType: "",
      orderTypeError: "",
      unitOfMessure: "",
      unitOfMessureError: "",
      unitPrice: "",
      unitPriceError: "",
      sellingPrice: "",
      sellingPriceError: "",
    });
    // }
  };

  render() {
    return (
      <Card>
        <CardHeader color="primary">
          <h4 style={cardTitleGreen}>Configure BULK / DOMESTIC Price</h4>
        </CardHeader>
        <CardBody>
          <GridContainer justify="center">
            {/* <Grid container justify="center"> */}
            <form>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Input
                      name="orderType"
                      style={input}
                      fullWidth
                      placeholder="Order Type"
                      value={this.state.orderType}
                      onChange={(e) => this.change(e)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Input
                  style={input}
                  name="unitOfMessure"
                  placeholder="Unit Of Messure"
                  value={this.state.unitOfMessure}
                  onChange={(e) => this.change(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <Input
                  style={input}
                  name="sellingPrice"
                  placeholder="Selling Price"
                  value={this.state.sellingPrice}
                  onChange={(e) => this.change(e)}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "3rem" }}>
                <Grid container>
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
                      onClick={(e) => this.onSubmit(e)}
                    >
                      Save
                    </Button>
                  </Grid>
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
                      onClick={(e) => this.onSubmit(e)}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}
