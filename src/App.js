import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';
import ButtonListCart from './components/ButtonListCart';

class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <ButtonListCart />
              <InitialMsg />
              </Route>
            <Route path="/cart-itens">
              <CartItems />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
