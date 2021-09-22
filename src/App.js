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
import Checkout from './pages/Checkout';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      categoriesBar: [],
      searched: false,
      searchResults: [],
      getProducts: [],
      allEvaluation: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then((items) => this.setState({
        categoriesBar: items,
        loaded: true,
      }));
  }

  handleClick = ({ title, thumbnail, id, price }, decrease) => {
    const { getProducts } = this.state;
    let newItem;
    let newState;

    if (getProducts.some((product) => product.id === id)) {
      let index;
      const product = getProducts.filter((prod, ind) => {
        if (prod.id === id) index = ind;
        return prod.id === id;
      })[0];
      const quantity = decrease ? product.quantity - 1 : product.quantity + 1;
      newState = [...getProducts];
      newState.splice(index, 1, { thumbnail, id, title, price, quantity });
    } else {
      newItem = { thumbnail, id, title, price, quantity: 1 };
      newState = [...getProducts, newItem];
    }

    this.setState({
      getProducts: newState,
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

  saveEvaluation = (id, valueForm) => {
    // Pega apenas o array de comentarios de todos produtos
    const { allEvaluation } = this.state;
    // Pega valores do form
    const { email, evaluation, comment } = valueForm;
    // Procura se tem avaliações para esse produto que está sendo avaliado.
    const evalProduct = allEvaluation.filter((elemnt) => elemnt.id === id);
    // Se existir entra nessa condição;
    if (evalProduct.length >= 1) {
      // Pega o array dos comentarios desse produto {MLB1243497783: Array(2)}
      const array = evalProduct[0].comments;
      // Cria um novo array com as avaliações antigas e adiciona a nova avaliação
      array.push({ email, evaluation, comment });
      // Cria um novo objeto das avaliações do produto
      const newEvaluation = { id, comments: array };
      // Remove o objeto das avaliações do produto desatualizado
      const atualizaState = allEvaluation.filter((elemnt) => elemnt.id !== id);
      // cria um novo array avaliações de todos produtos atualizados
      atualizaState.push(newEvaluation);// [...atualizaState, newEvaluation];
      // salve esse array no state
      this.setState({ allEvaluation: atualizaState });
    } else {
      // caso o produto não contém nenhuma avaliação, será criado um objeto para salvar as suas avaliações
      const newEvaluation = { id, comments: [{ email, evaluation, comment }] };
      allEvaluation.push(newEvaluation);
      this.setState({ allEvaluation });
    }
  };

  render() {
    const {
      categoriesBar, loaded, searched, searchResults, getProducts, allEvaluation,
    } = this.state;
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
                itemsAdd={ getProducts }
                callback={ this.handleClick }
              />
            </Route>
            <Route
              path="/product/:categoryId/:id"
              render={ (props) => (
                <Product
                  { ...props }
                  callback={ this.handleClick }
                  submitForm={ this.saveEvaluation }
                  allEvaluation={ allEvaluation }
                />
              ) }
            />
            <Route path="/checkout">
              <Checkout cartItems={ getProducts } />
            </Route>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}

export default App;
