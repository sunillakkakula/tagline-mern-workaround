import Popper from "@material-ui/core/";

<Popper
  placement="bottom"
  disablePortal={true}
  modifiers={{
    flip: {
      enabled: true,
    },
    preventOverflow: {
      enabled: true,
      boundariesElement: "viewport",
    },
    arrow: {
      enabled: true,
      //   element: arrowRef,
    },
  }}
></Popper>;
