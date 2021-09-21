import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';
import CategoriesBar from './components/CategoriesBar';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getDetailsProductById } from './services/api';
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

  handleCLick = async (event) => {
    const { getProduct } = this.state;
    const item = await getDetailsProductById(event.target.value);
    this.setState({
      getProduct: [...getProduct, item],
    });
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
                        callback={ this.handleCLick }
                        searchResults={ searchResults }
                      />) }
                  </div>
                </>) }
            />
            <Route path="/cart-items">
              <CartItems itemsAdd={ getProduct } />
            </Route>
            <Route
              path="/product/:categoryId/:id"
              render={ (props) => (
                <Product
                  { ...props }
                  callback={ this.handleCLick }
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
