import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import ProductDetailsScreen from "./components/ProductDetailsScreen";
import CartScreen from "./components/CartScreen";
const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductDetailsScreen} />
          <Route path="/cart/:id?/" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
