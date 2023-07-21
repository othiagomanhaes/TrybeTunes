import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/trybetunes" component={ Login } />
        <Route
          path="/trybetunes/album/:id"
          render={ (props) => <Album { ... props } /> }
        />
        <Route path="/trybetunes/search" component={ Search } />
        <Route path="/trybetunes/favorites" component={ Favorites } />
        <Route path="/trybetunes/profile/edit" component={ ProfileEdit } />
        <Route path="/trybetunes/profile" component={ Profile } />
        <Route path="/trybetunes/*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
