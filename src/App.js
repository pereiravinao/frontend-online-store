import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';
import CartItems from './pages/CartItems';

class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <ButtonListCart />
              <InitialMsg />
            </Route>
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
