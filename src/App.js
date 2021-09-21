import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';
import CategoriesBar from './components/CategoriesBar';
import {
  getCategories,
  getProductsFromCategoryAndQuery } from './services/api';
import ListProducts from './components/ListProducts';
import Product from './pages/Product';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      categoriesBar: [],
      searched: false,
      searchResults: [],
      getProduct: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((items) => this.setState({
        categoriesBar: items,
        loaded: true,
      }));
  }

  handleClick = ({ title, thumbnail, id, price }) => {
    const { getProduct } = this.state;
    let newItem;

    if (getProduct.some((product) => product.id === id)) {
      const product = getProduct.filter((prod) => prod.id === id)[0];
      const quantity = product.quantity + 1;
      newItem = { thumbnail, id, title, price, quantity };
    } else {
      newItem = { thumbnail, id, title, price, quantity: 1 };
    }

    const newState = getProduct.filter((it) => it.id !== id);

    this.setState({
      getProduct: [...newState, newItem],
    });
  }

  IncreaseOrDecrease = (ID, increase, decrease) => {
    const { getProduct } = this.state;
    let newItem;

    const product = getProduct.filter((prod) => prod.id === ID)[0];
    const { thumbnail, id, title, price, quantity } = product;
    if (increase) {
      const quantityp = product.quantity + 1;
      newItem = { thumbnail, id, title, price, quantity: quantityp };
    }
    if (decrease) {
      if (quantity > 1) {
        const quantityp = product.quantity - 1;
        newItem = { thumbnail, id, title, price, quantity: quantityp };
      } else {
        console.log('Opa!');
      }
      const newState = getProduct.filter((it) => it.id !== ID);

      this.setState({
        getProduct: [...newState, newItem],
      });
    }
  }

  searchItems = (category, query) => {
    this.setState({ searched: false });
    getProductsFromCategoryAndQuery(category, query)
      .then(({ results }) => this.setState({
        searched: true,
        searchResults: results,
      }));
  }

  render() {
    const { categoriesBar, loaded, searched, searchResults, getProduct } = this.state;
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (
                <>
                  <div>
                    { loaded && <CategoriesBar
                      items={ categoriesBar }
                      callback={ this.searchItems }
                    /> }
                  </div>
                  <div>
                    <nav>
                      <InitialMsg callback={ this.searchItems } condition={ searched } />
                      <ButtonListCart />
                    </nav>
                    { searched && (
                      <ListProducts
                        callback={ this.handleClick }
                        searchResults={ searchResults }
                      />) }
                  </div>
                </>) }
            />
            <Route path="/cart-items">
              <CartItems
                itemsAdd={ getProduct }
                ChangeQuant={ this.IncreaseOrDecrease }
              />
            </Route>
            <Route
              path="/product/:categoryId/:id"
              render={ (props) => (
                <Product
                  { ...props }
                  callback={ this.handleClick }
                />
              ) }
            />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
