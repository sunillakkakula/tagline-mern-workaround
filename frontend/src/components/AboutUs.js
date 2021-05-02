import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Section, SectionAlternate } from "./organisms";
import Contact from "./Contact";
import Hero from "../components/Hero";
import Story from "../components/Story";
import WhoWeAre from "../components/WhoWeAre";
import Team from "../components/Team";
import Partners from "../components/Partners";
import Gallery from "../components/Gallery";

import { team, companies, mapData, gallery } from "../data";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  sectionPartners: {
    boxShadow: "0 5px 20px 0 rgba(90, 202, 157, 0.05)",
    "& .section-alternate__content": {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Some About Us Content
      <Section />
      <Team data={team} />
      {/* <Hero /> */}
      {/* <Section>
        <Story />
      </Section> */}
      {/* <Hero /> */}
      {/* <Hero />
      <Section>
        <Story />
      </Section>
      <Section className={classes.sectionNoPaddingTop}>
        <WhoWeAre />
      </Section>
      <Section className={classes.sectionNoPaddingTop}>
        <Team data={team} />
      </Section>
      <SectionAlternate className={classes.sectionPartners}>
        <Partners data={companies} />
      </SectionAlternate>
      <Contact data={mapData} />
      <SectionAlternate>
        <Gallery data={gallery} />
      </SectionAlternate> */}
    </div>
  );
};

export default AboutUs;
// export default AboutUs;
// import React from "react";

// const AboutUs = () => {
//   return <div>About Us</div>;
// };

// export default AboutUs;
