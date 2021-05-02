import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { SectionHeader, TypedText } from "../components/molecules";

const useStyles = makeStyles((theme) => ({
  typed: {
    fontWeight: "bold",
  },
}));

const Hero = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={className} {...rest}>
      <SectionHeader
        title={
          <>
            A modern design system
            <br />
            for your new
            <br />
            <TypedText
              component="span"
              variant="h2"
              color="secondary"
              className={classes.typed}
              typedProps={{
                strings: [
                  "e-commerce",
                  "expo",
                  "startup",
                  "online course",
                  "coworking space",
                  "job listing",
                  "and many more...",
                ],
                typeSpeed: 50,
                loop: true,
              }}
            />
          </>
        }
        subtitle="TheFront will make your product look modern and professional while saving you precious time."
        align="center"
        titleProps={{
          variant: "h2",
          color: "textPrimary",
        }}
        subtitleProps={{
          color: "textPrimary",
          variant: "h5",
        }}
        ctaGroup={[
          <Button
            size="large"
            variant="contained"
            color="primary"
            component="a"
            target="blank"
            href="https://material-ui.com/store/items/the-front-landing-page/"
          >
            Buy Now
          </Button>,
          <Button
            size="large"
            variant="outlined"
            color="primary"
            component="a"
            target="blank"
            href="https://thefront-styleguide.maccarianagency.com/"
          >
            Documentation
          </Button>,
        ]}
        data-aos="fade-up"
        disableGutter
      />
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
