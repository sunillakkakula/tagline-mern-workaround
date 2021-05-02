import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const orderType = [
  { id: "loose", title: "Loose" },
  { id: "bulk", title: "Bulk" },
];

export default function AddProductForm() {
  const [value, setValue] = useState("loose");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log("Selected" + event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <h5>Order Type</h5>
      </FormLabel>
      <RadioGroup
        aria-label="orderType"
        name="orderType"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="loose" control={<Radio />} label="Loose" />
        <FormControlLabel value="bulk" control={<Radio />} label="Bulk" />
      </RadioGroup>
    </FormControl>
  );
}
