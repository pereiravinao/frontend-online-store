import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';
import CategoriesBar from './components/CategoriesBar';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      categoriesBar: [],
      serched: false,
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
    getProductsFromCategoryAndQuery(category, query)
      .then(({ results }) => this.setState({
        searched: true,
        searchResults: results,
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
                  <InitialMsg callbck={ this.searchItems } condition={  } />
                  <ListProducts />
                  <ButtonListCart />
                </>) }
            />
            <Route path="/cart-items">
              <CartItems />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
