import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';
import CategoriesBar from './components/CategoriesBar';
import { getCategories } from './services/api';
import Product from './pages/Product';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      categoriesBar: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((items) => this.setState({
        categoriesBar: items,
        loaded: true,
      }));
  }

  render() {
    const { categoriesBar, loaded } = this.state;
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (
                <>
                  { loaded && <CategoriesBar { ...props } items={ categoriesBar } /> }
                  <InitialMsg />
                  <ButtonListCart />
                </>) }
            />
            <Route path="/cart-items">
              <CartItems />
            </Route>
            <Route path="/Product/:id">
              <Product />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
