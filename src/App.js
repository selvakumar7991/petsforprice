import React from 'react';
import './App.css';
import $ from 'jquery';
import PostAd from './pages/PostAd';
import ListingSearch from './pages/listingSearch';
import Home from './pages/Home';
import ProductDetail from './pages/productDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/price_range_style.css';
import './css/jquery-ui.css'
import './css/font-awesome.min.css'
import './css/custom.css'
import 'react-notifications-component/dist/theme.css'
import './css/owlcarousel/owl.theme.default.min.css'
import './css/owlcarousel/owl.carousel.min.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/postad">
          <PostAd/>
        </Route>
        <Route path="/listingSearch">
          <ListingSearch/>
        </Route>
        <Route path="/productDetail/:category/:id">
          <ProductDetail/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;