import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginBottom: "1.5em",
  },
}));

const BulkLooseRadioGroup = ({ parentCB }) => {
  const [orderType, setOrderType] = React.useState("bulk");
  const handleChange = (event) => {
    setOrderType((prev) => event.target.value);
    console.log("Selected " + event.target.value);
    parentCB(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            fontSize: "0.80rem",
            fontWeight: "400",
            color: "nlGray",
          }}
        >
          <FormControl
            component="fieldset"
            style={{
              fontSize: "0.80rem",
              fontWeight: "400",
              color: "nlGray",
            }}
          >
            <RadioGroup
              style={{
                display: "flex",
                fontSize: "0.80rem",
                fontWeight: "400",
                color: "nlGray",
              }}
              aria-label="orderType"
              name="orderType"
              value={orderType}
              onChange={handleChange}
            >
              <FormControlLabel
                style={{
                  fontSize: "0.80rem",
                  fontWeight: "400",
                  color: "nlGray",
                }}
                value="bulk"
                control={<Radio />}
                label="Bulk"
              />
              <FormControlLabel
                value="domestic"
                control={<Radio />}
                label="Domestic"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};
export default BulkLooseRadioGroup;
