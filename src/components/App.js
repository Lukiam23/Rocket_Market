import axios from 'axios';
import Card from './Card';
import { Helmet } from 'react-helmet';
import Header from './Header';
import MenuLateral from './MenuLateral'
import React, { useState } from "react";
import styles from '../css/App.module.css';
import AppContextProvider from './AppContextProvider';
import {BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import CarPage from '../pages/CarPage';
import HomePage from '../pages/HomePage';
import MessagePage from '../pages/MessagePage';


const baseURL = 'https://my-json-server.typicode.com/Lukiam23/Osf_Academy_project/cards';
const brazilianNumberFormatter = new Intl.NumberFormat("pt-BR")

function App() {
  // state é um objeto do JavaScrip usado pelo React para representar uma informação sobre a situação atual da componente 
  //useState permite ter variáveis state em componentes que são função
  // state => estado inicial
  // setDisplay => função para mudar o estado inicial
  const [pokemonList, setPokemonList] = useState(null);
  const [display, setDisplay] = useState(null);
  const [filtro, setFiltro] = useState(null);

  React.useEffect(() => {
    axios.get(baseURL)
    .then((res) => {
      setDisplay(res.data);
      setPokemonList(res.data);
    });
  }, []);

  if (!display) return null;

  return (
    <AppContextProvider>
    <Router>
      <div className={styles.App}>
        <Helmet>
          <script src="https://kit.fontawesome.com/3475a922f1.js" crossorigin="anonymous"></script>
          <title>RocketMarket</title>
        </Helmet>

        <Header data={pokemonList} display={display}/>
        
        <MenuLateral filtro = {filtro} setFiltro = {setFiltro} data={pokemonList} display={display} setDisplay = {setDisplay}/>
      </div>
      <Routes>
        <Route exact path='/' element={<HomePage display={display}/>}/>
        <Route path='car' element={<CarPage />}/>
        <Route path='car/message' element={<MessagePage />}/>
        <Route />
      </Routes>
    </Router>
    </AppContextProvider>

  );
}

export default App;
