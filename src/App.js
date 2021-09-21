import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';
import CategoriesBar from './components/CategoriesBar';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
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
    };
  }

  componentDidMount() {
    getCategories()
      .then((items) => this.setState({
        categoriesBar: items,
        loaded: true,
      }));
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
    const { categoriesBar, loaded, searched, searchResults } = this.state;
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
                        searchResults={ searchResults }
                        callback={ this.searchItems }
                      />) }
                  </div>
                </>) }
            />
            <Route path="/cart-items">
              <CartItems />
            </Route>
            <Route
              path="/product/:categoryId/:id"
              render={ (props) => (
                searched
                    && <Product
                      { ...props }
                      result={ searchResults }
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
