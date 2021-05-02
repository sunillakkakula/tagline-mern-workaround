import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    justifyContent: "center",
  },
  caption: {
    fontSize: 20,
    fontWeight: 500,
    alignItems: "center",
  },
  pos: {
    marginBottom: 12,
  },
  cardcontent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardcontent}>
        <Typography color="secondary" className={classes.title} align="center">
          Established in the year 2007, Tagline Tarders Private Limited in
          Gachibowli , Hyderabad is a top player in the category of spices in
          Hyderabad.
        </Typography>
        <Typography color="secondary" className={classes.subtitle}>
          It's flagship Brands "Vishudha Chilli, Vishudha Turmeric, Vishudha
          Coriander" ar manufactured with the latest equipement totally
          untouched by Hands..
        </Typography>
        <Typography align="center">
          <span style={{ backgroundColor: "#800000", color: "white" }}>
            Vishudha Chilli, Turmeric, Coriander guarantees
          </span>
        </Typography>
        <Typography
          color="secondary"
          className={classes.caption}
          align="center"
        >
          <span style={{ backgroundColor: "#800000", color: "white" }}>
            "The Real Aroma of Quality"
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
