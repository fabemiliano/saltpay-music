import './App.scss';
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Views/Home/Home';
import Favourites from './Views/Favourites/Favourites';
import Playlists from './Views/Playlists/Playlists';
import Login from './Views/Login/Login';
import SignIn from './Views/SignIn/SignIn';
import Settings from './Views/Settings/Settings';
import PageNotFound from './Views/PageNotFound/PageNotFound';
import Loading from './Views/Loading/Loading';
import SignLogIn from './Components/SignLogIn/SignLogIn';
import fetchSongs from './Actions/SongsActions';
import fetchRates from './Actions/ExchangeActions';
import store from './Store';

function App({ loading, logged, isPro }) {
  const { dispatch } = store;
  const { i18n } = useTranslation();

  console.log(isPro)

  useEffect(() => {
    const language = localStorage.getItem('language');
    if (!language) {
      i18n.changeLanguage('en');
    }
    i18n.changeLanguage(language);
  }, []);

  useEffect(() => {
    fetchSongs(dispatch);
    fetchRates(dispatch);
  }, []);

  console.log(store.getState())

  return (
    <div className="App">

      {!logged && <SignLogIn />}

      <div className="main">
        <Sidebar />
        {loading && <Loading />}
        {!loading && (
          <Switch>
            <Route exact path="/favourites" component={Favourites} />
            <Route exact path="/playlists" component={Playlists} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/" component={Home} />
            <Route component={PageNotFound} />
          </Switch>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.songReducer.loading,
  logged: state.loginReducer.logged,
  isPro: state.loginReducer.isPro,
});

export default connect(mapStateToProps)(App);
