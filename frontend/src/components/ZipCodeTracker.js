import React from "react";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import IconButton from "@material-ui/core/IconButton";
import $ from "jquery";
const ZipCodeTracker = () => {
  const getCurrentLocationZipCode = () => {
    let latitude = 0.0;
    let longitude = 0.0;
    const KEY = "AIzaSyDt-KMX0JInMJHvQ55xBfCGE0YkXh4P7Ys";
    const errorCB = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    const successCB = (pos) => {
      let crd = pos.coords;
      console.log(`Latitude : ${crd.latitude} Longitude: ${crd.longitude}`);
      latitude = `${crd.latitude}`;
      longitude = `${crd.longitude}`;
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY}`;
      console.log(
        `Now Fetching the Zip Code for  ${crd.latitude} Longitude: ${crd.longitude} `
      );

      fetch(URL)
        .then((response) => response.json())
        .then((results) => {
          console.log(results);
          const zip_code = results.results[0].address_components.find(
            (addr) => addr.types[0] === "postal_code"
          ).short_name;
          console.log("zip_code : " + zip_code);
          $("#zip_code").html("Deliver to " + zip_code);
        });
    };
    const accuracyOptions = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      successCB,
      errorCB,
      accuracyOptions
    );
  };
  return (
    <div className="flex">
      <RoomOutlinedIcon
        onClick={() => {
          getCurrentLocationZipCode();
        }}
      />
      <div id="zip_code" style={{ fontSize: "0.85rem" }}>
        Search city
      </div>
    </div>
  );
};

export default ZipCodeTracker;
