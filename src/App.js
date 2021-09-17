import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitialMsg from './components/InitialMsg';

class App extends Component {
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={ InitialMsg } />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
