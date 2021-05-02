import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

const MainCarousel = (props) => {
  var items = [
    {
      name: "Chilli",
      description: "Best Chilli by Vishudha Tagline Traders",
      image: "./images/4.jpg",
    },
    {
      name: "Turmeric",
      description: "Best Turmeric Powder by Vishudha Tagline Traders",
      image: "./images/3.jpg",
    },
    {
      name: "Coriander",
      description: "Best Coriander Powder by Vishudha Tagline Traders",
      image: "./images/5.jpg",
    },
  ];

  return (
    <Carousel autoPlay style={{ marginTop: "5rem" }} indicators>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  return (
    <Paper>
      <img
        style={{ opacity: "1", width: "100%", height: "25rem" }}
        alt="Coriander"
        src={props.item.image}
      />
      {/* <h2>{props.item.name}</h2> */}
      {/* <p>{props.item.description}</p> */}
    </Paper>
  );
}
export default MainCarousel;
