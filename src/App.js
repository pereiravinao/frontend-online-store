import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';
import CategoriesBar from './components/CategoriesBar';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import ListProducts from './components/ListProducts';

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
              render={ (props) => (
                <>
                  { loaded && <CategoriesBar { ...props } items={ categoriesBar } /> }
                  <InitialMsg callback={ this.searchItems } condition={ searched } />
                  <ButtonListCart />
                  <ListProducts searchResults={ searchResults } />
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
