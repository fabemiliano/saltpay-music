import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Home, { viewMoreSongs, setSongsToShow, cropName } from '../Views/Home/Home';
// import mockStore from './mockStore';
import currencyReducer from '../Reducers/CurrenciesReducer';
import favouritesReducer from '../Reducers/FavouritesReducer';
import loginReducer from '../Reducers/LoginReducer';
import plalistReducer from '../Reducers/PlaylistReducer';
import songReducer from '../Reducers/SongReducer';

const renderWithRedux = (
  component,
  {
    initialState, store = createStore(combineReducers({
      currencyReducer, favouritesReducer, loginReducer, plalistReducer, songReducer,
    }), initialState),
  } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str) => str,
    i18n: {
      changeLanguage: () => new Promise(() => { }),
    },
  }),
}));

describe('Home', () => {
  it('tests if component is rendered', () => {
    const { getByTestId } = renderWithRedux(<Home />);
    const element = getByTestId('home');
    expect(element).toBeInTheDocument();
  });

  // it('tests button show-more', () => {
  //   const mock = jest.fn();
  //   viewMoreSongs = mock;

  //   const { getByTestId } = renderWithRedux(<Home />);

  //   const element = getByTestId('show-more');

  //   fireEvent.click(element);
  //   expect(mock).toHaveBeenCalled();
  // });

  it('tests function cropName', () => {
    const shortName = 'short';
    const longName = 'veryyyyyyyyyyloooooooooooooonaaaaaaaaaaaaaaaaaaaaaammmmmmmmeeeeee';

    const shortNameResult = cropName(shortName);
    const longNameResult = cropName(longName);

    expect(shortNameResult).toBe('short');
    expect(longNameResult).toBe('veryyyyyyyyyyloooooooooooooona...');
  });
});
