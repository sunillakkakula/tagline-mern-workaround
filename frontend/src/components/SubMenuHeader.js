import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  groceries: {
    fontWeight: "bold",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    margin: "0 20px",
    cursor: "pointer",
  },
}));
const SubMenuHeader = () => {
  const classes = useStyles();
  return (
    <div id="container">
      <div>
        <div className="_331-kn _2tvxW">
          <div
            className="InyRMC _3Il5oO"
            data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU"
          >
            <div className="_37M3Pb">
              <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.Z59MBD3MYEZK"
              >
                <div className="_1mkliO">
                  <div
                    className="CXW8mj"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <img
                      className="_396cs4 _3exPp9"
                      alt="Staples"
                      src="/Staples.jpg"
                    />
                  </div>
                </div>
                <div className="_1psGvi SLyWEo">
                  <div>
                    <div className="xtXmba">
                      Packaged Food
                      <svg
                        width="5"
                        height="8"
                        viewBox="0 0 16 27"
                        xmlns="http://www.w3.org/2000/svg"
                        className="_2sVfI7"
                      >
                        <path
                          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                          fill="#fff"
                          className="_1zrN4q"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.Z59MBD3MYEZK"
              >
                <div className="_1mkliO">
                  <div
                    className="CXW8mj"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <img
                      className="_396cs4 _3exPp9"
                      alt="Snacks - Beverages"
                      src="/Snacks-Beverages.jpg"
                    />
                  </div>
                </div>
                <div className="_1psGvi SLyWEo">
                  <div>
                    <div className="xtXmba"></div>
                  </div>
                </div>
              </div>
              {/* <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.HI2REO8H1YPI"
              >
                <>
                  <div className="_1mkliO">
                    <div
                      className="CXW8mj"
                      style={{ height: "64px", width: "64px" }}
                    >
                      <img
                        className="_396cs4 _3exPp9"
                        alt="Snacks &amp; Beverages "
                        src="Snacks-Beverages.jpg"
                      />
                    </div>
                  </div>
                  <div className="_1psGvi SLyWEo">
                    <DropdownMenu
                      className={classes.groceries}
                      menu={
                        <span>
                          Snacks & Beverages
                          <IoIosArrowDown />
                        </span>
                      }
                      menus={[
                        {
                          label: "Biscuits",
                          href: "",
                          icon: null,
                        },
                        {
                          label: "Chips,Namkeen & Snacks",
                          href: "",
                          icon: null,
                        },
                        { label: "Tea", href: "", icon: null },

                        {
                          label: "Coffee",
                          href: "",
                          icon: null,
                        },
                        {
                          label: "Juices",
                          href: "",
                          icon: null,
                        },
                        {
                          label: "Health Drink Mix",
                          href: "",
                          icon: null,
                        },
                        {
                          label: "Soft Drinks",
                          href: "",
                          icon: null,
                        },
                        {
                          label: "Water",
                          href: "",
                          icon: null,
                        },
                      ]}
                    />
                  </div>
                </>
              </div> */}
              <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.Z59MBD3MYEZK"
              >
                <div className="_1mkliO">
                  <div
                    className="CXW8mj"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <img
                      className="_396cs4 _3exPp9"
                      alt="Packaged Food"
                      src="/Packaged-Food.jpg"
                    />
                  </div>
                </div>
                <div className="_1psGvi SLyWEo">
                  <div>
                    <div className="xtXmba">
                      Packaged Food
                      <svg
                        width="5"
                        height="8"
                        viewBox="0 0 16 27"
                        xmlns="http://www.w3.org/2000/svg"
                        className="_2sVfI7"
                      >
                        <path
                          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                          fill="#fff"
                          className="_1zrN4q"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.VGFMBXS1MB2C"
              >
                <div className="_1mkliO">
                  <div
                    className="CXW8mj"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <img
                      className="_396cs4 _3exPp9"
                      alt="Personal &amp;  Baby Care"
                      src="/Baby-Care.jpg  "
                    />
                  </div>
                </div>
                <div className="_1psGvi SLyWEo">
                  <div>
                    <div className="xtXmba">
                      Personal &amp; Baby Care
                      <svg
                        width="5"
                        height="8"
                        viewBox="0 0 16 27"
                        xmlns="http://www.w3.org/2000/svg"
                        className="_2sVfI7"
                      >
                        <path
                          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                          fill="#fff"
                          className="_1zrN4q"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.Z59MBD3MYEZK"
              >
                <div className="_1mkliO">
                  <div
                    className="CXW8mj"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <img
                      className="_396cs4 _3exPp9"
                      alt="Snacks - Beverages"
                      src="/Household-Care.jpg"
                    />
                  </div>
                </div>
                <div className="_1psGvi SLyWEo">
                  <div>
                    <div className="xtXmba">
                      Household Care
                      <svg
                        width="5"
                        height="8"
                        viewBox="0 0 16 27"
                        xmlns="http://www.w3.org/2000/svg"
                        className="_2sVfI7"
                      >
                        <path
                          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                          fill="#fff"
                          className="_1zrN4q"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="eFQ30H"
                data-tkid="M_cac3f597-4795-46b1-855d-8f1527f4ee4e_2_TD249NVPLJWU_MC.Z59MBD3MYEZK"
              >
                <div className="_1mkliO">
                  <div
                    className="CXW8mj"
                    style={{ height: "64px", width: "64px" }}
                  >
                    <img
                      className="_396cs4 _3exPp9"
                      alt="Dairy - Eggs"
                      src="/Dairy-Eggs.jpg"
                    />
                  </div>
                </div>
                <div className="_1psGvi SLyWEo">
                  <div>
                    <div className="xtXmba">
                      Dairy - Eggs
                      <svg
                        width="5"
                        height="8"
                        viewBox="0 0 16 27"
                        xmlns="http://www.w3.org/2000/svg"
                        className="_2sVfI7"
                      >
                        <path
                          d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                          fill="#fff"
                          className="_1zrN4q"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="_3LxdjL _3NzWOH">
          <div className="_1TVFmy _23XefD">
            <div
              className="ZM3_EH"
              style={{ transform: "scaleX(0.811128)" }}
            ></div>
          </div>
        </div>

        <div className="_1EcK2J _38JCdA">
          <div className="bra6U8">
            <svg
              width="16"
              height="27"
              viewBox="0 0 16 27"
              xmlns="http://www.w3.org/2000/svg"
              className="_2TdLiZ"
            >
              <path
                d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z"
                fill="#fff"
                className="_3ZKfA2"
              ></path>
            </svg>
            <span>Back to top</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMenuHeader;
