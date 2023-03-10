// Importações de bibliotecas
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// -----------------------------------------

import './app.css';

// Importações de componentes
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorite from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
// -----------------------------------------

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="routes">
            <Switch>

              <Route exact path="/" component={ Login } />
              <Route path="/search" component={ Search } />
              <Route path="/album/:id" component={ Album } />
              <Route path="/favorites" component={ Favorite } />
              <Route exact path="/profile" component={ Profile } />
              <Route exact path="/profile/edit" component={ ProfileEdit } />

              <Route path="*" component={ NotFound } />

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
