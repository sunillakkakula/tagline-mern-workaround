// import CategoriesSubMenu from "./components/CategoriesSubMenu";
import { Container } from "@material-ui/core";
import SubMenuHeader from "./components/SubMenuHeader";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/Theme";
import Header from "./components/Header";
import CategoryWiseProducts from "./components/CategoryWiseProducts";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import ProductScreen from "./components/ProductScreen";
import CartLayoutScreen from "./components/CartLayoutScreen";
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import ProfileScreen from "./components/ProfileScreen";
import ShippingScreen from "./components/ShippingScreen";
import PaymentScreen from "./components/PaymentScreen";
import PlaceOrderScreen from "./components/PlaceOrderScreen";
import OrderScreen from "./components/OrderScreen";
import UserListScreen from "./components/UserListScreen";
import UserEditScreen from "./components/UserEditScreen";
import ProductListScreen from "./components/ProductListScreen";
import ProductEditScreen from "./components/ProductEditScreen";
import ProductCreateScreen from "./components/ProductCreateScreen";
import OrderListScreen from "./components/OrderListScreen";
// import SubMenuHeader from "./components/SubMenuHeader";
import MuiHeader from "./components/MuiHeader";
// import CategoriesSubMenuVer2 from "./components/CategoriesSubMenuVer2";
import Dashboard from "./components/Dashboard";
import ProductSettingsScreen from "./components/ProductSettingsScreen";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* NEED TO APPLY MARGIN  TO APP BAR REFER MUI C...
            AND COMMENT THE BELOW LIKE AFTER MAKING CHANGES  -KSP
        */}
        {/* <CategoriesSubMenu /> */}
        {/* <MuiHeader /> */}
        <MuiHeader />
        {/* <SubMenuHeader /> */}
        {/* <CategoriesSubMenuVer2 /> */}
        <main className="py-0">
          <Container>
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/signup" component={SignUpScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/product/:productId" component={ProductScreen} exact />
            <Route path="/cart/:id?" component={CartLayoutScreen} />
            <Route path="/showcart" component={CartLayoutScreen} />
            {/* <Route path="/" component={CartLayoutScreen} /> */}
            <Route path="/admin/userlist" component={UserListScreen} exact />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
              exact
            />
            <Route
              path="/admin/product/new"
              component={ProductCreateScreen}
              exact
            />
            <Route path="/admin/orderlist" component={OrderListScreen} exact />
            <Route
              path="/search/:keyword"
              component={CategoryWiseProducts}
              exact
            />
            <Route
              path="/page/:pageNumber"
              component={CategoryWiseProducts}
              exact
            />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={CategoryWiseProducts}
              exact
            />
            <Route
              path="/category/:categoryId"
              component={CategoryWiseProducts}
              exact
            />
            <Route
              path="/admin/product-settings/:productId"
              component={ProductSettingsScreen}
              exact
            />
            <Route path="/admin/products" component={ProductListScreen} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/aboutus" component={AboutUs} exact />
            <Route path="/" component={Dashboard} exact />
          </Container>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
